# Shopping Memo

買い物メモアプリケーション - Next.js App Router + Supabase + OpenAI

## 概要

このアプリケーションは、Next.js（App Router）、Supabase、OpenAI APIを使用した買い物メモアプリです。

## 技術スタック

- **フレームワーク**: Next.js 16.2 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド**: Supabase
- **AI機能**: OpenAI API
- **リンター**: ESLint

## プロジェクト構造

```
shopping-memo/
├── app/                    # Next.js App Router
│   ├── components/         # 共通UIコンポーネント
│   └── actions/            # Server Actions
├── features/               # 機能別ディレクトリ
│   └── memo/
│       ├── components/     # メモ機能のコンポーネント
│       ├── usecase/        # ビジネスロジック層
│       └── repository/     # データアクセス層
├── lib/                    # ユーティリティ関数・ヘルパー
├── types/                  # 型定義ファイル
├── public/                 # 静的ファイル
└── docs_local/             # ローカルドキュメント（Git管理外）
```

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、必要な環境変数を設定してください。

```bash
cp .env.example .env
```

必要な環境変数:
- `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
- `SUPABASE_SERVICE_ROLE_KEY`: Supabaseのサービスロールキー
- `OPENAI_API_KEY`: OpenAI APIキー

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## スクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルドを作成
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintでコードをチェック

## ライセンス

MIT License
