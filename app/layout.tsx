import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "いちわ｜Web漫画の第1話が見つかる場所",
  description: "Xで公開されているWeb漫画を、第1話から探せる漫画リンク集。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
