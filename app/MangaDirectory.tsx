"use client";

import { useMemo, useState } from "react";

type Manga = {
  title: string;
  author: string;
  handle: string;
  summary: string;
  genre: string;
  tags: string[];
  accent: string;
  mark: string;
  xPostUrl?: string;
};

const mangaList: Manga[] = [
  {
    title: "月曜日の宇宙人",
    author: "青井ハル",
    handle: "@aoi_haru",
    summary: "憂うつな月曜の朝、駅のホームで出会ったのは、地球の会社に初出勤する宇宙人でした。",
    genre: "コメディ",
    tags: ["日常", "SF", "ほっこり"],
    accent: "coral",
    mark: "月",
  },
  {
    title: "となりの透明さん",
    author: "三角ミナ",
    handle: "@minamina_comic",
    summary: "姿の見えない隣人と、壁越しに始まる不思議な共同生活。声だけの距離が少しずつ近づいていく。",
    genre: "恋愛",
    tags: ["青春", "ラブコメ", "不思議"],
    accent: "blue",
    mark: "透",
  },
  {
    title: "深夜二時の喫茶店",
    author: "夜野トワ",
    handle: "@yoruno_towa",
    summary: "眠れない人だけがたどり着く店。無口な店主と一杯のコーヒーが、今夜の悩みをほどいていく。",
    genre: "ドラマ",
    tags: ["ヒューマン", "短編", "夜"],
    accent: "navy",
    mark: "夜",
  },
  {
    title: "勇者、家事代行になります",
    author: "山田ポチ",
    handle: "@poti_yamada",
    summary: "魔王を倒した勇者の次の仕事は家事代行。伝説の剣で切るのは、世界ではなく長ねぎです。",
    genre: "ファンタジー",
    tags: ["ギャグ", "異世界", "お仕事"],
    accent: "yellow",
    mark: "勇",
  },
  {
    title: "猫町アパートメント",
    author: "ねむりネコ",
    handle: "@nemurineko_zzz",
    summary: "住人はみんな訳ありの猫。古いアパートを舞台にした、やさしくて少し切ない群像劇。",
    genre: "日常",
    tags: ["動物", "癒やし", "群像劇"],
    accent: "green",
    mark: "猫",
  },
  {
    title: "放課後エンドロール",
    author: "橘ユウ",
    handle: "@tachibana_yu",
    summary: "廃部寸前の映画部で出会った三人。最後の文化祭へ向けて、まだ名前のない物語を撮り始める。",
    genre: "青春",
    tags: ["学園", "友情", "映画"],
    accent: "pink",
    mark: "映",
  },
];

const genres = ["すべて", "コメディ", "恋愛", "ドラマ", "ファンタジー", "日常", "青春"];

export function MangaDirectory() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("すべて");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return mangaList.filter((manga) => {
      const matchesGenre = genre === "すべて" || manga.genre === genre;
      const haystack = [manga.title, manga.author, manga.handle, manga.summary, ...manga.tags]
        .join(" ")
        .toLowerCase();
      return matchesGenre && (!normalized || haystack.includes(normalized));
    });
  }, [genre, query]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="いちわ ホーム">
          <span className="brand-mark">一</span>
          <span>いちわ</span>
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#works">作品を探す</a>
          <a href="#about">このサイトについて</a>
        </nav>
        <a className="submit-link" href="mailto:hello@example.com?subject=作品掲載の相談">作品を掲載する <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> WEB COMIC DISCOVERY</p>
          <h1>最初の<span>1話</span>が、<br />いちばん面白い。</h1>
          <p className="hero-description">Xで話題のWeb漫画を、第1話から。<br />あなたの「続きが読みたい」がきっと見つかる。</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun" />
          <div className="book book-back"><span>つづきは<br />どこへ？</span></div>
          <div className="book book-front"><span className="book-label">WEB COMIC</span><strong>第<br />一<br />話</strong><i>から、はじまる。</i></div>
          <span className="spark spark-one">✦</span>
          <span className="spark spark-two">✦</span>
        </div>
      </section>

      <section className="directory" id="works">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> PICK YOUR STORY</p>
            <h2>次は、どの物語へ？</h2>
          </div>
          <p>いま読める <strong>{mangaList.length}</strong> 作品</p>
        </div>

        <div className="search-row">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">作品を検索</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="タイトル・作者・キーワードで検索" />
          </label>
          <div className="genre-list" aria-label="ジャンルで絞り込む">
            {genres.map((item) => (
              <button className={genre === item ? "active" : ""} key={item} onClick={() => setGenre(item)}>{item}</button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="manga-grid">
            {filtered.map((manga, index) => <MangaCard manga={manga} number={index + 1} key={manga.title} />)}
          </div>
        ) : (
          <div className="empty-state"><span>〇</span><h3>作品が見つかりませんでした</h3><p>検索ワードやジャンルを変えてみてください。</p></div>
        )}
      </section>

      <section className="about" id="about">
        <p className="eyebrow"><span /> ABOUT ICHIWA</p>
        <div className="about-grid">
          <h2>たった1話から、<br />好きがはじまる。</h2>
          <div>
            <p>「いちわ」は、Xで公開されているWeb漫画の第1話を集めた小さな本棚です。タイムラインで見かけた作品も、まだ知らない作品も、ここから物語の入口へ。</p>
            <p className="note">掲載作品は作者による公開ポストへ直接つながります。</p>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">一</span><span>いちわ</span></a>
        <p>Web漫画の第1話が見つかる場所。</p>
        <p className="copyright">© 2026 ICHIWA</p>
      </footer>
    </main>
  );
}

function MangaCard({ manga, number }: { manga: Manga; number: number }) {
  return (
    <article className="manga-card">
      <div className={`post-preview ${manga.accent}`}>
        {manga.xPostUrl ? (
          <blockquote className="twitter-tweet"><a href={manga.xPostUrl}>Xで第1話を読む</a></blockquote>
        ) : (
          <div className="sample-post">
            <div className="post-user"><span>{manga.author.slice(0, 1)}</span><p><strong>{manga.author}</strong><small>{manga.handle}</small></p><b>𝕏</b></div>
            <div className="comic-panel"><i>第1話</i><strong>{manga.mark}</strong><small>サンプル作品</small></div>
            <p>『{manga.title}』第1話</p>
            <div className="post-meta"><span>♡ 1,248</span><span>↻ 384</span><span>▱ 12.8万</span></div>
          </div>
        )}
        <span className="card-number">{String(number).padStart(2, "0")}</span>
      </div>
      <div className="card-content">
        <div className="card-genre">{manga.genre}</div>
        <h3>{manga.title}</h3>
        <p className="author">{manga.author} <span>{manga.handle}</span></p>
        <p className="summary">{manga.summary}</p>
        <div className="tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
        {manga.xPostUrl ? <a className="read-link" href={manga.xPostUrl} target="_blank" rel="noreferrer">Xで第1話を読む <span>→</span></a> : <span className="read-link disabled">サンプル作品 <span>—</span></span>}
      </div>
    </article>
  );
}
