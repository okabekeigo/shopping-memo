-- shopping-memo 初期データベーススキーマ
-- 作成日: 2026-04-01

-- ============================================================================
-- テーブル作成
-- ============================================================================

-- 買い物メモテーブル
CREATE TABLE IF NOT EXISTS public.memos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  share_token TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- メモアイテム(材料)テーブル
CREATE TABLE IF NOT EXISTS public.memo_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memo_id UUID NOT NULL REFERENCES public.memos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity TEXT,
  unit TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_checked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- インデックス作成
-- ============================================================================

-- メモテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_memos_user_id ON public.memos(user_id);
CREATE INDEX IF NOT EXISTS idx_memos_share_token ON public.memos(share_token) WHERE share_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_memos_created_at ON public.memos(created_at DESC);

-- メモアイテムテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_memo_items_memo_id ON public.memo_items(memo_id);
CREATE INDEX IF NOT EXISTS idx_memo_items_order ON public.memo_items(memo_id, order_index);

-- ============================================================================
-- 更新日時自動更新トリガー
-- ============================================================================

-- updated_at を自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- メモテーブルにトリガーを追加
CREATE TRIGGER update_memos_updated_at
  BEFORE UPDATE ON public.memos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- メモアイテムテーブルにトリガーを追加
CREATE TRIGGER update_memo_items_updated_at
  BEFORE UPDATE ON public.memo_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS) ポリシー設定
-- ============================================================================

-- RLS を有効化
ALTER TABLE public.memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memo_items ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- memos テーブルのRLSポリシー
-- ============================================================================

-- ユーザーは自分のメモのみ閲覧可能
CREATE POLICY "Users can view their own memos"
  ON public.memos
  FOR SELECT
  USING (auth.uid() = user_id);

-- share_token がある場合は誰でも閲覧可能 (URL共有機能)
CREATE POLICY "Anyone can view shared memos"
  ON public.memos
  FOR SELECT
  USING (share_token IS NOT NULL);

-- ユーザーは自分のメモのみ作成可能
CREATE POLICY "Users can create their own memos"
  ON public.memos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のメモのみ更新可能
CREATE POLICY "Users can update their own memos"
  ON public.memos
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のメモのみ削除可能
CREATE POLICY "Users can delete their own memos"
  ON public.memos
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- memo_items テーブルのRLSポリシー
-- ============================================================================

-- ユーザーは自分のメモに紐づくアイテムのみ閲覧可能
CREATE POLICY "Users can view their own memo items"
  ON public.memo_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.user_id = auth.uid()
    )
  );

-- share_token があるメモのアイテムは誰でも閲覧可能
CREATE POLICY "Anyone can view shared memo items"
  ON public.memo_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.share_token IS NOT NULL
    )
  );

-- ユーザーは自分のメモに紐づくアイテムのみ作成可能
CREATE POLICY "Users can create items for their own memos"
  ON public.memo_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.user_id = auth.uid()
    )
  );

-- ユーザーは自分のメモに紐づくアイテムのみ更新可能
CREATE POLICY "Users can update their own memo items"
  ON public.memo_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.user_id = auth.uid()
    )
  );

-- ユーザーは自分のメモに紐づくアイテムのみ削除可能
CREATE POLICY "Users can delete their own memo items"
  ON public.memo_items
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.memos
      WHERE memos.id = memo_items.memo_id
      AND memos.user_id = auth.uid()
    )
  );

-- ============================================================================
-- コメント追加 (テーブル・カラムの説明)
-- ============================================================================

COMMENT ON TABLE public.memos IS '買い物メモを管理するテーブル';
COMMENT ON COLUMN public.memos.id IS 'メモのユニークID';
COMMENT ON COLUMN public.memos.user_id IS 'メモ作成者のユーザーID';
COMMENT ON COLUMN public.memos.title IS 'メモのタイトル';
COMMENT ON COLUMN public.memos.image_url IS 'レシピ画像のURL (Supabase Storageへのパス)';
COMMENT ON COLUMN public.memos.share_token IS 'URL共有用のトークン';
COMMENT ON COLUMN public.memos.created_at IS 'メモ作成日時';
COMMENT ON COLUMN public.memos.updated_at IS 'メモ更新日時';

COMMENT ON TABLE public.memo_items IS 'メモに含まれる個別アイテム(材料)を管理するテーブル';
COMMENT ON COLUMN public.memo_items.id IS 'アイテムのユニークID';
COMMENT ON COLUMN public.memo_items.memo_id IS '所属するメモのID';
COMMENT ON COLUMN public.memo_items.name IS '材料名';
COMMENT ON COLUMN public.memo_items.quantity IS '数量 (例: 2, 500, 適量)';
COMMENT ON COLUMN public.memo_items.unit IS '単位 (例: 個, g, ml, パック)';
COMMENT ON COLUMN public.memo_items.order_index IS '並べ替え用のインデックス';
COMMENT ON COLUMN public.memo_items.is_checked IS '購入済みチェック';
COMMENT ON COLUMN public.memo_items.created_at IS 'アイテム作成日時';
COMMENT ON COLUMN public.memo_items.updated_at IS 'アイテム更新日時';
