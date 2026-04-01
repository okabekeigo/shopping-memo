/**
 * Supabase 自動生成型定義のプレースホルダー
 *
 * このファイルは、Supabase CLI によって自動生成される型定義のプレースホルダーです。
 *
 * 【使用方法】
 * 1. Supabase プロジェクトをセットアップ
 * 2. マイグレーションを実行してデータベーススキーマを作成
 * 3. 以下のコマンドで型定義を自動生成:
 *
 *    ```bash
 *    npx supabase gen types typescript --project-id <YOUR_PROJECT_ID> > types/supabase.ts
 *    ```
 *
 *    または、ローカル開発環境の場合:
 *
 *    ```bash
 *    npx supabase gen types typescript --local > types/supabase.ts
 *    ```
 *
 * 【注意事項】
 * - このファイルは上記コマンドで完全に上書きされます
 * - 手動での編集は避けてください
 * - スキーマ変更後は必ず型定義を再生成してください
 *
 * 【参考】
 * Supabase 型生成ドキュメント:
 * https://supabase.com/docs/guides/api/rest/generating-types
 */

/**
 * データベーステーブルの型定義 (プレースホルダー)
 * 実際の型は Supabase CLI で自動生成されます
 */
export interface Database {
  public: {
    Tables: {
      memos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          image_url: string | null;
          share_token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          image_url?: string | null;
          share_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          image_url?: string | null;
          share_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      memo_items: {
        Row: {
          id: string;
          memo_id: string;
          name: string;
          quantity: string | null;
          unit: string | null;
          order_index: number;
          is_checked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          memo_id: string;
          name: string;
          quantity?: string | null;
          unit?: string | null;
          order_index?: number;
          is_checked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          memo_id?: string;
          name?: string;
          quantity?: string | null;
          unit?: string | null;
          order_index?: number;
          is_checked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
