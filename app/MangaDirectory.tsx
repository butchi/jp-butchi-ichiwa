"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Format = "X完全連載型" | "独立短編・4コマ型" | "完結アーカイブ型" | "試し読み・外部誘導型";

type Manga = {
  title: string;
  author: string;
  handle: string;
  summary: string;
  genre: string;
  format: Format;
  tags: string[];
  accent: string;
  mark: string;
  xPostUrl: string;
  entryLabel: string;
};

const mangaList: Manga[] = [
  { title: "ちいかわ", author: "ナガノ", handle: "@ngnchiikawa", summary: "小さくてかわいいキャラクターたちの日常と冒険を描く、X発の継続連載。", genre: "日常・ファンタジー", format: "X完全連載型", tags: ["連載中", "日常", "ファンタジー"], accent: "coral", mark: "ち", xPostUrl: "https://x.com/ngnchiikawa/status/1221832141786378241", entryLabel: "第1話を読む" },
  { title: "ねこに転生したおじさん", author: "やじま", handle: "@yajima_en", summary: "猫に転生したおじさんと、彼を溺愛する社長の毎日を描くショート連載。", genre: "コメディ", format: "X完全連載型", tags: ["連載中", "猫", "日常"], accent: "blue", mark: "猫", xPostUrl: "https://x.com/yajima_en/status/1622215266385158144", entryLabel: "第1話を読む" },
  { title: "毎日でぶどり", author: "毎日でぶどり", handle: "@debu_dori", summary: "仕事や生活の「あるある」を、でぶどりたちが軽やかに切り取る4コマ作品。", genre: "4コマ・コメディ", format: "独立短編・4コマ型", tags: ["4コマ", "仕事", "日常"], accent: "navy", mark: "鳥", xPostUrl: "https://x.com/debu_dori/status/957227822472298496", entryLabel: "最初の掲載作を読む" },
  { title: "ねこようかい", author: "ぱんだにあ", handle: "@pandania0", summary: "猫と妖怪が自然に暮らす世界を、ゆるく不思議に描く4コマシリーズ。", genre: "4コマ・ファンタジー", format: "独立短編・4コマ型", tags: ["4コマ", "猫", "妖怪"], accent: "yellow", mark: "妖", xPostUrl: "https://x.com/pandania0/status/667642138939621380", entryLabel: "第1話を読む" },
  { title: "100日後に死ぬワニ", author: "きくちゆうき", handle: "@yuukikikuchi", summary: "ワニの何気ない100日間を、1日1話で追った完結済みのカウントダウン漫画。", genre: "ドラマ", format: "完結アーカイブ型", tags: ["完結", "カウントダウン", "日常"], accent: "green", mark: "ワ", xPostUrl: "https://x.com/yuukikikuchi/status/1206558270195822593", entryLabel: "1日目を読む" },
];

const formats = ["すべて", "X完全連載型", "独立短編・4コマ型", "完結アーカイブ型", "試し読み・外部誘導型"] as const;

export function MangaDirectory() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<(typeof formats)[number]>("すべて");
  const filtered = useMemo(() => mangaList.filter((manga) => {
    const normalized = query.trim().toLowerCase();
    const haystack = [manga.title, manga.author, manga.handle, manga.summary, manga.genre, manga.format, ...manga.tags].join(" ").toLowerCase();
    return (format === "すべて" || manga.format === format) && (!normalized || haystack.includes(normalized));
  }), [format, query]);

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="いちわ ホーム"><span className="brand-mark">一</span><span>いちわ</span></a>
      <nav aria-label="メインナビゲーション"><a href="#top">作品を探す</a><a href="#about">このサイトについて</a></nav>
      <a className="submit-link" href="mailto:hello@example.com?subject=作品掲載の相談">作品を掲載する <span>↗</span></a>
    </header>
    <section className="directory" id="top">
      <div className="section-heading"><div><p className="eyebrow"><span /> WEB COMIC DIRECTORY</p><h2>第1話から、探す。</h2></div><p>いま読める <strong>{mangaList.length}</strong> 作品</p></div>
      <div className="search-row">
        <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">作品を検索</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="タイトル・作者・キーワードで検索" /></label>
        <div className="genre-list" aria-label="公開形式で絞り込む">{formats.map((item) => <button className={format === item ? "active" : ""} key={item} onClick={() => setFormat(item)}>{item}</button>)}</div>
      </div>
      {filtered.length ? <div className="manga-grid">{filtered.map((manga, index) => <MangaCard manga={manga} number={index + 1} key={manga.title} />)}</div> : <div className="empty-state"><span>〇</span><h3>作品が見つかりませんでした</h3><p>検索ワードや公開形式を変えてみてください。</p></div>}
    </section>
    <section className="about" id="about"><p className="eyebrow"><span /> ABOUT ICHIWA</p><div className="about-grid"><h2>たった1話から、<br />好きがはじまる。</h2><div><p>「いちわ」は、Xで公開されているWeb漫画の第1話を集めた小さな本棚です。作者本人または出版社公式アカウントの投稿だけを掲載し、物語の入口へ直接つなぎます。</p><p className="note">公開形式：X完全連載型／独立短編・4コマ型／完結アーカイブ型／試し読み・外部誘導型</p></div></div></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">一</span><span>いちわ</span></a><p>Web漫画の第1話が見つかる場所。</p><p className="copyright">© 2026 ICHIWA</p></footer>
  </main>;
}

function MangaCard({ manga, number }: { manga: Manga; number: number }) {
  return <article className="manga-card">
    <div className={`post-preview ${manga.accent}`}><XPostEmbed url={manga.xPostUrl} label={`${manga.title} ${manga.entryLabel}`} /><span className="card-number">{String(number).padStart(2, "0")}</span></div>
    <div className="card-content"><div className="card-genre">{manga.format}</div><h3>{manga.title}</h3><p className="author">{manga.author} <span>{manga.handle}</span></p><p className="summary">{manga.summary}</p><div className="tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><a className="read-link" href={manga.xPostUrl} target="_blank" rel="noreferrer">Xで{manga.entryLabel} <span>→</span></a></div>
  </article>;
}

function XPostEmbed({ url, label }: { url: string; label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => window.twttr?.widgets.load(container.current ?? undefined);
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://platform.twitter.com/widgets.js"]');
    if (existing) {
      existing.addEventListener("load", load);
      load();
      return () => existing.removeEventListener("load", load);
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.addEventListener("load", load);
    document.body.appendChild(script);
    return () => script.removeEventListener("load", load);
  }, []);

  return <div className="x-embed" ref={container}><blockquote className="twitter-tweet" data-dnt="true" data-conversation="none"><a href={url}>{label}</a></blockquote></div>;
}

declare global {
  interface Window {
    twttr?: { widgets: { load: (element?: HTMLElement) => void } };
  }
}
