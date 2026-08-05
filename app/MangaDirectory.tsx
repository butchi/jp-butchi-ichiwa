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
  xPostUrl?: string;
  entryLabel: string;
};

const entry = (title: string, author: string, handle: string, summary: string, genre: string, format: Format, xPostUrl?: string, tags: string[] = []) => ({ title, author, handle: handle ? `@${handle}` : "公式アカウント確認中", format, xPostUrl, tags, entryLabel: "公式ポストを読む", summary: summary || "Xで公開された作品ポストから読めるWeb漫画です。", genre: genre || "Web漫画", accent: ["coral", "blue", "navy", "yellow", "green", "pink"][title.length % 6], mark: title.slice(0, 1) });

const mangaList: Manga[] = [
  entry("ちいかわ", "ナガノ", "ngnchiikawa", "小さくてかわいいキャラクターたちの日常と冒険を描くX発の継続連載。", "日常・ファンタジー", "X完全連載型", "https://x.com/ngnchiikawa/status/1221617681654108160", ["連載中", "日常", "キャラクター"]),
  entry("ねこに転生したおじさん", "やじま", "yajima_en", "おじさんが猫になってしまった生活を描くSNS発漫画。", "動物・日常", "X完全連載型", "https://x.com/yajima_en/status/1622215266385158144", ["猫", "転生"]),
  entry("気になってる人が男じゃなかった", "新井すみこ", "agu_knzm", "音楽をきっかけに始まる青春恋愛漫画。", "青春・恋愛", "X完全連載型", "https://x.com/agu_knzm/status/1512998788025110532", ["青春", "音楽"]),
  entry("今さらですが、幼なじみを好きになってしまいました", "丸戸史明・よむ", "sa_ra_na_mi", "幼なじみ同士の距離感を描く恋愛作品。", "恋愛", "X完全連載型", "https://x.com/sa_ra_na_mi/status/1739058372568338764", ["恋愛"]),
  entry("こぐまのケーキ屋さん", "カメントツ", "Computerozi", "こぐまが営むケーキ屋さんの日常漫画。", "日常・ほのぼの", "X完全連載型", "https://x.com/Computerozi/status/928581647653470208", ["動物", "癒やし"]),
  entry("ねこようかい", "ぱんだにあ", "pandania0", "猫と妖怪を組み合わせた4コマ漫画。", "動物・妖怪", "X完全連載型", "https://x.com/pandania0/status/617305503471767553", ["猫", "妖怪"]),
  entry("俺、つしま", "おぷうのきょうだい", "tsushimacat", "猫との暮らしを描くコミカルな漫画。", "動物・エッセイ", "X完全連載型", "https://x.com/tsushimacat/status/894503903663857664", ["猫"]),
  entry("くまのむちゃうま日記", "ナガノ", "ngntrtr", "食べ物をテーマにしたナガノ作品。", "グルメ・日常", "X完全連載型", "https://x.com/ngntrtr/status/1501983079467945989", ["食べ物"]),
  entry("夜は猫といっしょ", "キュルZ", "kyuryuZ", "猫との生活を描く短編漫画。", "動物・日常", "独立短編・4コマ型", "https://x.com/kyuryuZ/status/990882388535214080", ["猫", "短編"]),
  entry("毎日でぶどり", "橋本ナオキ", "debu_dori", "鳥たちの日常や社会ネタを描く4コマ。", "4コマ・社会風刺", "独立短編・4コマ型", "https://x.com/debu_dori/status/957226427128008704", ["4コマ"]),
  entry("犬と猫どっちも飼ってると毎日たのしい", "松本ひで吉", "hidekiccan", "犬猫それぞれの性格を描くペット漫画。", "動物・エッセイ", "独立短編・4コマ型", "https://x.com/hidekiccan/status/828038858151337984", ["犬", "猫"]),
  entry("可愛い嘘のカワウソ", "Lommy", "kawa_ii_uso", "カワウソの日常を描くキャラクター漫画。", "キャラクター", "独立短編・4コマ型", "https://x.com/kawa_ii_uso/status/989801584816111616", ["癒やし"]),
  entry("耐え子の日常", "そろそろ谷川", "OLtaeko", "理不尽な出来事に耐える女性のコメディ。", "日常・ギャグ", "独立短編・4コマ型", "https://x.com/OLtaeko/status/670961704965042176", ["4コマ"]),
  entry("お文具といっしょ", "お文具", "imoko_iimo", "お文具さんたちの日常を描く癒やし作品。", "キャラクター", "独立短編・4コマ型", "https://x.com/imoko_iimo/status/1039127201705127938", ["癒やし"]),
  entry("サラリーマン山崎シゲル", "田中光", "hikaru_tm", "シュールな会社員の日常漫画。", "ギャグ", "独立短編・4コマ型", "https://x.com/avocadohikaru/status/377465793031569408", ["シュール"]),
  entry("ぬこー様ちゃん絵日記", "ぬこー様ちゃん", "nukosama", "漫画家の日常を描くエッセイ漫画。", "エッセイ", "独立短編・4コマ型", "https://x.com/nukosama/status/1505107035071086594", ["日常"]),
  entry("100日後に死ぬワニ", "きくちゆうき", "yuukikikuchi", "100日間毎日更新された完結漫画。", "ドラマ", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/1206558270195822593", ["完結", "話題作"]),
  entry("100日後に死ぬ（×）ネズミ", "きくちゆうき", "yuukikikuchi", "100日後に死ぬワニ関連作品。", "ドラマ", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/1826197681129304258", ["完結"]),
  // entry("100日後に打ち切られる漫画家", "浦田カズヒロ", "urata_k", "100日形式で展開された漫画家漫画。", "漫画家・コメディ", "完結アーカイブ型", "https://x.com/urata_k/status/1231152159892262913", ["100日"]),
  // entry("先輩がうざい後輩の話", "しろまんた", "shiromanta1020", "職場の先輩後輩を描くラブコメ。", "恋愛・職場", "完結アーカイブ型", "https://x.com/shiromanta1020/status/909432831041970176", ["恋愛"]),
  entry("マジで付き合う15分前", "Perico", "perico_op", "高校生男女の青春恋愛漫画。", "青春・恋愛", "完結アーカイブ型", "https://x.com/perico_op/status/1177893385513787392", ["青春"]),
  entry("おじさまと猫", "桜井海", "sakurai_umi_", "孤独な男性と猫の交流を描く漫画。", "動物・ドラマ", "試し読み・外部誘導型", "https://x.com/sakurai_umi_/status/874235144307068928", ["猫"]),
  entry("スーパーの裏でヤニ吸うふたり", "地主", "jinusi822", "スーパー裏で出会う男女の物語。", "恋愛・日常", "試し読み・外部誘導型", "https://x.com/jinusi822/status/1501436920894689281", ["恋愛"]),
  entry("新しい上司はど天然", "いちかわ暖", "ichikawadan", "天然な上司との会社生活漫画。", "職場・コメディ", "試し読み・外部誘導型", "https://x.com/ichikawadan/status/996031226308837376", ["会社"]),
  entry("休日のわるものさん", "森川侑", "mori_kw", "悪の組織幹部の休日を描く漫画。", "コメディ", "試し読み・外部誘導型", "https://x.com/mori_kw/status/939159843662786566", ["日常"]),
  // entry("氷属性男子とクールな同僚女子", "殿ヶ谷美由記", "tonogayamiyuki", "職場恋愛とファンタジーを融合した作品。", "恋愛・ファンタジー", "試し読み・外部誘導型", "https://x.com/tonogayamiyuki/status/1234567890123456789", ["恋愛"]),
  entry("可愛いだけじゃない式守さん", "真木蛍五", "nankatobidesou", "強くてかっこいいヒロインの青春ラブコメ。", "恋愛・青春", "試し読み・外部誘導型", "https://x.com/nankatobidesou/status/1038379729466707969", ["恋愛"]),
  // entry("絶対BLになる世界VS絶対BLになりたくない男", "紺吉", "kn_sousaku", "BL世界を舞台にしたメタコメディ。", "ギャグ・BL", "試し読み・外部誘導型", "https://x.com/kn_sousaku/status/1210222912772296704", ["BL", "ギャグ"]),
  entry("オフ会したらとんでもないやつが来た話", "mii.m", "__miii___", "SNS時代の出会いを描くコメディ。", "コメディ", "試し読み・外部誘導型", "https://x.com/__miii___/status/1344961449135751169", ["SNS"]),
];

const formats: Format[] = ["X完全連載型", "独立短編・4コマ型", "完結アーカイブ型", "試し読み・外部誘導型"];

export function MangaDirectory() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<Format>("X完全連載型");
  const filtered = useMemo(() => mangaList.filter((manga) => {
    const normalized = query.trim().toLowerCase();
    const haystack = [manga.title, manga.author, manga.handle, manga.summary, manga.genre, manga.format, ...manga.tags].join(" ").toLowerCase();
    return manga.format === format && (!normalized || haystack.includes(normalized));
  }), [format, query]);

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="いちわ ホーム"><span className="brand-mark">一</span><span>いちわ</span></a>
      <nav aria-label="メインナビゲーション"><a href="#top">作品を探す</a><a href="#about">このサイトについて</a></nav>
      <a className="submit-link" href="mailto:hello@example.com?subject=作品掲載の相談">作品を掲載する <span>↗</span></a>
    </header>
    <section className="directory" id="top">
      <div className="section-heading"><div><p className="eyebrow"><span /> WEB COMIC DIRECTORY</p><h1>第1話から、探す。</h1></div><p>いま読める <strong>{mangaList.length}</strong> 作品</p></div>
      <p className="directory-intro">Xで読めるWeb漫画を、作品・作者・公開形式から探せる一覧です。気になるキャラクターや話題の作品は、公式ポストから第1話へ。最新話、全巻、映画化などの最新情報は、作品ごとの公式アカウントや出版社の案内もあわせてご確認ください。</p>
      <div className="search-row">
        <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">作品を検索</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="タイトル・作者・キーワードで検索" /></label>
        <div className="genre-list" aria-label="公開形式で絞り込む">{formats.map((item) => <button className={format === item ? "active" : ""} key={item} onClick={() => setFormat(item)}>{item}</button>)}</div>
      </div>
      <p className="collection-note">分類を切り替えると、その分類の公式Xポストだけを読み込みます。</p>
      {filtered.length ? <div className="manga-grid">{filtered.map((manga, index) => <MangaCard manga={manga} number={index + 1} key={manga.title} />)}</div> : <div className="empty-state"><span>〇</span><h3>作品が見つかりませんでした</h3><p>検索ワードや公開形式を変えてみてください。</p></div>}
    </section>
    <section className="about" id="about"><p className="eyebrow"><span /> ABOUT ICHIWA</p><div className="about-grid"><h2>たった1話から、<br />好きがはじまる。</h2><div><p>「いちわ」は、Xで公開されているWeb漫画の第1話を集めた小さな本棚です。作者本人または出版社公式アカウントの投稿だけを掲載し、物語の入口へ直接つなぎます。</p><p>連載中の作品は最新話を追う入口として、完結作品は読み返し用のアーカイブとして整理しています。書籍の全巻情報、映画・アニメなどの映像化、キャラクター情報は変更されることがあるため、購入や視聴の前には各作品の公式案内をご確認ください。</p><p className="note">公開形式：X完全連載型／独立短編・4コマ型／完結アーカイブ型／試し読み・外部誘導型</p></div></div></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">一</span><span>いちわ</span></a><p>Web漫画の第1話が見つかる場所。</p><p className="copyright">© 2026 ICHIWA</p></footer>
  </main>;
}

function MangaCard({ manga, number }: { manga: Manga; number: number }) {
  return <article className="manga-card">
    <div className={`post-preview ${manga.accent}`}>{manga.xPostUrl ? <XPostEmbed url={manga.xPostUrl} label={`${manga.title} ${manga.entryLabel}`} /> : <OfficialPostPending manga={manga} />}<span className="card-number">{String(number).padStart(2, "0")}</span></div>
    <div className="card-content"><div className="card-genre">{manga.format}</div><h3>{manga.title}</h3><p className="author">{manga.author} <span>{manga.handle}</span></p><p className="summary">{manga.summary}</p><div className="tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{manga.xPostUrl ? <a className="read-link" href={manga.xPostUrl} target="_blank" rel="noopener noreferrer">Xで{manga.entryLabel} <span>→</span></a> : <span className="read-link is-pending">公式ポストを確認中 <span>—</span></span>}</div>
  </article>;
}

function OfficialPostPending({ manga }: { manga: Manga }) {
  return <div className="embed-pending"><span aria-hidden="true">𝕏</span><p>公式ポストを確認中</p><small>{manga.handle}</small></div>;
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
