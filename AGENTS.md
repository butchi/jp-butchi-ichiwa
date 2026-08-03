# いちわ

## 開発

- React、Vite、TypeScriptを使用する静的サイト。
- パッケージ管理にはnpmを使用する。
- `npm run dev`で開発し、`npm run build`で公開ビルドを検証する。
- 作品データは`app/MangaDirectory.tsx`内の`mangaList`で管理する。
- Cloudflare Pagesでは「React (Vite)」プリセット、ビルドコマンド`npm run build`、出力ディレクトリ`dist`を使用する。
- 実在作品を登録するときは、作者名・概要・Xの第1話ポストURLを確認する。

## ドキュメント関係

Markdown文書を追加するときは、Markdownlintの規則に沿った出力をする。

## 公開

- localhostで確認するのでAgent側でのホスティングはせず、基本的にCloudflare Pages専用の静的サイトとして扱う。
- Functions等が必要になる場合は、Cloudflare Workersも可
- 公開前にビルドを通し、公開対象の変更をコミットする。
