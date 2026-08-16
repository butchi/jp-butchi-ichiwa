import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "いちわ｜Xで読めるWeb漫画の第1話・最新話一覧",
  description: "Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja">
    <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2862407789219932" crossOrigin="anonymous" />
    </head>
    <body>
      <GoogleTagManager gtmId="GTM-P84T2BRG" />
      {children}
    </body>
  </html>;
}
