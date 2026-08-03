import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_JP({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const mincho = Zen_Old_Mincho({ variable: "--font-mincho", subsets: ["latin"], weight: ["600", "700", "900"] });

export const metadata: Metadata = {
  title: "いちわ｜Web漫画の第1話が見つかる場所",
  description: "Xで公開されているWeb漫画を、第1話から探せる漫画リンク集。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body className={`${sans.variable} ${mincho.variable}`}>{children}</body></html>;
}
