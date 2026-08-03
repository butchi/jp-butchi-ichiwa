import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "いちわ｜Xで読めるWeb漫画の第1話・最新話一覧",
  description: "Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja">
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P84T2BRG');`,
        }}
      />
    </head>
    <body>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P84T2BRG" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
      {children}
    </body>
  </html>;
}
