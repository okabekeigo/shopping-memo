/**
 * 共通で使用する型定義
 */

/**
 * API レスポンスの成功時の型
 * ジェネリック型で様々なデータ型に対応
 */
export interface ApiSuccessResponse<T = unknown> {
  /** レスポンスが成功したかどうか */
  success: true;

  /** レスポンスデータ */
  data: T;

  /** 追加メッセージ (オプション) */
  message?: string;
}

/**
 * API レスポンスのエラー時の型
 */
export interface ApiErrorResponse {
  /** レスポンスが成功したかどうか */
  success: false;

  /** エラーメッセージ */
  error: string;

  /** エラーコード (オプション) */
  code?: string;

  /** エラー詳細 (デバッグ用、オプション) */
  details?: unknown;
}

/**
 * API レスポンスの統合型
 * 成功またはエラーのいずれか
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * ページネーション情報の型
 */
export interface PaginationInfo {
  /** 現在のページ番号 (1始まり) */
  currentPage: number;

  /** 1ページあたりのアイテム数 */
  pageSize: number;

  /** 全体のアイテム数 */
  totalItems: number;

  /** 全体のページ数 */
  totalPages: number;

  /** 次のページがあるかどうか */
  hasNext: boolean;

  /** 前のページがあるかどうか */
  hasPrevious: boolean;
}

/**
 * ページネーション付きレスポンスの型
 */
export interface PaginatedResponse<T> {
  /** データの配列 */
  items: T[];

  /** ページネーション情報 */
  pagination: PaginationInfo;
}

/**
 * ソート順の型
 */
export type SortOrder = 'asc' | 'desc';

/**
 * ソート設定の型
 */
export interface SortConfig<T extends string = string> {
  /** ソート対象のフィールド */
  field: T;

  /** ソート順 */
  order: SortOrder;
}

/**
 * エラーの種類を表す列挙型
 */
export enum ErrorType {
  /** バリデーションエラー */
  VALIDATION = 'VALIDATION',

  /** 認証エラー */
  AUTHENTICATION = 'AUTHENTICATION',

  /** 認可エラー (権限不足) */
  AUTHORIZATION = 'AUTHORIZATION',

  /** リソースが見つからない */
  NOT_FOUND = 'NOT_FOUND',

  /** サーバー内部エラー */
  INTERNAL_SERVER = 'INTERNAL_SERVER',

  /** 外部API連携エラー */
  EXTERNAL_API = 'EXTERNAL_API',

  /** データベースエラー */
  DATABASE = 'DATABASE',
}

/**
 * アプリケーションエラーの型
 */
export interface AppError {
  /** エラータイプ */
  type: ErrorType;

  /** エラーメッセージ */
  message: string;

  /** エラーコード (オプション) */
  code?: string;

  /** 元のエラー (オプション) */
  originalError?: Error;
}

/**
 * 画像アップロード情報の型
 */
export interface UploadedImage {
  /** アップロードされた画像のURL */
  url: string;

  /** ファイル名 */
  fileName: string;

  /** ファイルサイズ (バイト) */
  fileSize: number;

  /** MIMEタイプ */
  mimeType: string;

  /** アップロード日時 */
  uploadedAt: Date;
}

/**
 * OCR処理結果の型
 */
export interface OCRResult {
  /** 抽出されたテキスト */
  text: string;

  /** 信頼度スコア (0-1、オプション) */
  confidence?: number;

  /** 処理にかかった時間 (ミリ秒、オプション) */
  processingTime?: number;
}

/**
 * 共有設定の型
 */
export interface ShareSettings {
  /** 共有が有効かどうか */
  isEnabled: boolean;

  /** 共有トークン */
  token: string | null;

  /** 共有URL */
  shareUrl: string | null;

  /** 共有作成日時 */
  createdAt: Date | null;
}

// メモ関連の型を再エクスポート
export * from './memo';
