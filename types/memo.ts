/**
 * 買い物メモエンティティの型定義
 */

/**
 * 買い物メモ全体の型定義
 * Supabase の memos テーブルに対応
 */
export interface Memo {
  /** メモのユニークID (UUID) */
  id: string;

  /** メモのタイトル */
  title: string;

  /** メモ作成者のユーザーID (Supabase Auth の user ID) */
  userId: string;

  /** アップロードされたレシピ画像のURL (Supabase Storage のパス) */
  imageUrl: string | null;

  /** URL共有用のトークン (家族内での共有に使用) */
  shareToken: string | null;

  /** メモ作成日時 */
  createdAt: Date;

  /** メモ更新日時 */
  updatedAt: Date;
}

/**
 * メモ作成時の入力データ型
 */
export interface CreateMemoInput {
  /** メモのタイトル */
  title: string;

  /** メモ作成者のユーザーID */
  userId: string;

  /** アップロードされたレシピ画像のURL (オプション) */
  imageUrl?: string | null;
}

/**
 * メモ更新時の入力データ型
 */
export interface UpdateMemoInput {
  /** 更新するメモのID */
  id: string;

  /** 新しいタイトル (オプション) */
  title?: string;

  /** 新しい画像URL (オプション) */
  imageUrl?: string | null;
}

/**
 * メモ内の個別アイテム(材料)の型定義
 * Supabase の memo_items テーブルに対応
 */
export interface MemoItem {
  /** アイテムのユニークID (UUID) */
  id: string;

  /** 所属するメモのID */
  memoId: string;

  /** 材料名 */
  name: string;

  /** 数量 (例: "2", "500", "適量" など) */
  quantity: string | null;

  /** 単位 (例: "個", "g", "ml", "パック" など) */
  unit: string | null;

  /** 並べ替え用のインデックス (小さい値ほど上に表示) */
  orderIndex: number;

  /** 購入済みかどうかのチェック状態 */
  isChecked: boolean;

  /** アイテム作成日時 */
  createdAt: Date;

  /** アイテム更新日時 */
  updatedAt: Date;
}

/**
 * メモアイテム作成時の入力データ型
 */
export interface CreateMemoItemInput {
  /** 所属するメモのID */
  memoId: string;

  /** 材料名 */
  name: string;

  /** 数量 (オプション) */
  quantity?: string | null;

  /** 単位 (オプション) */
  unit?: string | null;

  /** 並べ替え用のインデックス (オプション、未指定時は最後尾) */
  orderIndex?: number;
}

/**
 * メモアイテム更新時の入力データ型
 */
export interface UpdateMemoItemInput {
  /** 更新するアイテムのID */
  id: string;

  /** 新しい材料名 (オプション) */
  name?: string;

  /** 新しい数量 (オプション) */
  quantity?: string | null;

  /** 新しい単位 (オプション) */
  unit?: string | null;

  /** 新しい並べ替えインデックス (オプション) */
  orderIndex?: number;

  /** 新しいチェック状態 (オプション) */
  isChecked?: boolean;
}

/**
 * メモとそのアイテムをまとめた型
 * メモ詳細画面などで使用
 */
export interface MemoWithItems {
  /** メモ本体 */
  memo: Memo;

  /** メモに含まれるアイテムのリスト (orderIndex でソート済み) */
  items: MemoItem[];
}
