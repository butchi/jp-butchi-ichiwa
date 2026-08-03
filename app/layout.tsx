import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "いちわ｜Xで読めるWeb漫画の第1話・最新話一覧",
  description: "Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
