# いちわ

## 開発

- vinext、React、TypeScript、Tailwind CSSを使用する。
- パッケージ管理にはnpmを使用する。
- `npm run dev`で開発し、`npm run build`で公開ビルドを検証する。
- 作品データは`app/MangaDirectory.tsx`内の`mangaList`で管理する。
- 実在作品を登録するときは、作者名・概要・Xの第1話ポストURLを確認する。

## アセットとメタデータ

- faviconは仮で用意する。

## ドキュメント関係

Markdown文書を追加するときは、Markdownlintの規則に沿った出力をする。

## 公開

- 基本的にCloudflare Pages専用の静的サイトとして扱う。
- Functions等が必要になる場合は、Cloudflare Workersも可
- 公開前にビルドを通し、公開対象の変更をコミットする。
