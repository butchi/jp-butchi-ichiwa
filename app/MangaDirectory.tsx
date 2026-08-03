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

const entry = (title: string, author: string, handle: string, format: Format, xPostUrl?: string, tags: string[] = []) => ({ title, author, handle: handle ? `@${handle}` : "公式アカウント確認中", format, xPostUrl, tags, entryLabel: "公式ポストを読む", summary: "Xで公開された作品ポストから読めるWeb漫画です。", genre: "Web漫画", accent: ["coral", "blue", "navy", "yellow", "green", "pink"][title.length % 6], mark: title.slice(0, 1) });

const mangaList: Manga[] = [
  entry("ちいかわ", "ナガノ", "ngnchiikawa", "X完全連載型", "https://x.com/ngnchiikawa/status/1221832141786378241", ["◎", "連載中"]),
  entry("ねこに転生したおじさん", "やじま", "yajima_en", "X完全連載型", "https://x.com/yajima_en/status/1622215266385158144", ["◎", "連載中"]),
  entry("こぐまのケーキ屋さん", "カメントツ", "Computerozi", "X完全連載型", "https://x.com/Computerozi/status/426554355680956417", ["○", "併載"]),
  entry("ねこようかい", "ぱんだにあ", "pandania0", "X完全連載型", "https://x.com/pandania0/status/617305503471767553", ["◎", "連載中"]),
  entry("くまのむちゃうま日記", "ナガノ", "ngntrtr", "X完全連載型", "https://x.com/ngntrtr/status/679193259642458112", ["○", "アーカイブ"]),
  entry("おしゅしだよ", "やばいちゃん", "oshushidayo", "X完全連載型", undefined, ["○", "URL確認中"]),
  entry("俺、つしま", "おぷうのきょうだい", "tsushimacat", "X完全連載型", "https://x.com/tsushimacat/status/894503903663857664", ["○", "併載"]),
  entry("パンダと犬", "スティーヴン★スピルハンバーグ", "steven_spielham", "X完全連載型", "https://x.com/steven_spielham/status/895921519410397185", ["○", "併載"]),
  entry("なんでもない絵日記", "usao", "_usa_ooo", "X完全連載型", "https://x.com/_usa_ooo/status/615128633175203840", ["○", "併載"]),
  entry("きょうの横山家", "横山了一", "yokoyama_bancho", "X完全連載型", "https://x.com/yokoyama_bancho/status/393607608088543232", ["○", "ブログ併載"]),
  entry("今さらですが、幼なじみを好きになってしまいました", "丸戸史明・よむ", "sa_ra_na_mi", "X完全連載型", undefined, ["◎", "URL確認中"]),
  entry("気になってる人が男じゃなかった", "新井すみこ", "agu_knzm", "X完全連載型", "https://x.com/agu_knzm/status/1354791026716626949", ["◎", "連載中"]),
  entry("夜は猫といっしょ", "キュルZ", "kyuryuZ", "独立短編・4コマ型", "https://x.com/kyuryuZ/status/990882388535214080", ["◎", "猫"]),
  entry("毎日でぶどり", "橋本ナオキ", "debu_dori", "独立短編・4コマ型", "https://x.com/debu_dori/status/957227822472298496", ["◎", "4コマ"]),
  entry("犬と猫どっちも飼ってると毎日たのしい", "松本ひで吉", "hidekiccan", "独立短編・4コマ型", "https://x.com/hidekiccan/status/793824258694582273", ["◎", "動物"]),
  entry("耐え子の日常", "そろそろ谷川", "OLtaeko", "独立短編・4コマ型", "https://x.com/OLtaeko/status/705007534579449856", ["◎", "日常"]),
  entry("可愛い嘘のカワウソ", "Lommy", "kawa_ii_uso", "独立短編・4コマ型", undefined, ["◎", "URL確認中"]),
  entry("お文具といっしょ", "お文具", "imoko_iimo", "独立短編・4コマ型", "https://x.com/imoko_iimo/status/854629779928104960", ["○", "キャラクター"]),
  entry("鳥さん。", "よしかわまい", "torisan_manga", "独立短編・4コマ型", "https://x.com/torisan_manga/status/1587368853952028672", ["◎", "4コマ"]),
  entry("チュンまんが", "dollly", "", "独立短編・4コマ型", undefined, ["○", "公式URL確認中"]),
  entry("山本アヒルの実録4コマ", "山本アヒル", "", "独立短編・4コマ型", undefined, ["○", "公式URL確認中"]),
  entry("ごすじん大好きポン太の憂鬱", "山口さぷり", "", "独立短編・4コマ型", undefined, ["○", "公式URL確認中"]),
  entry("サラリーマン山崎シゲル", "田中光", "", "独立短編・4コマ型", undefined, ["◎", "公式URL確認中"]),
  entry("ニックとレバー", "ミヤタキョウゴロウ", "miyatakyogoro", "独立短編・4コマ型", "https://x.com/miyatakyogoro/status/979709429737123845", ["◎", "4コマ"]),
  entry("100日後に死ぬワニ", "きくちゆうき", "yuukikikuchi", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/1206558270195822593", ["◎", "完結"]),
  entry("100日後に死ぬ（×）ネズミ", "きくちゆうき", "yuukikikuchi", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/745155786398015489", ["◎", "完結"]),
  entry("100日後に打ち切られる漫画家", "浦田カズヒロ", "", "完結アーカイブ型", undefined, ["◎", "公式URL確認中"]),
  entry("100日後に退職する47歳", "TOME", "tome_ura", "完結アーカイブ型", "https://x.com/tome_ura/status/1379742458712453120", ["◎", "完結"]),
  entry("100日後にやめる契約駅員さん", "ザバック", "theback_blog", "完結アーカイブ型", "https://x.com/theback_blog/status/1176858580923736065", ["◎", "完結"]),
  entry("100日後に運命が逆転するオタク", "たけくん", "zizio413", "完結アーカイブ型", "https://x.com/zizio413/status/1263374343343505409", ["◎", "完結"]),
  entry("マジで付き合う15分前", "Perico", "perico_op", "完結アーカイブ型", "https://x.com/perico_op/status/1012479652508471296", ["◎", "完結"]),
  entry("ほむら先生はたぶんモテない", "せかねこ", "sekaneko13", "完結アーカイブ型", "https://x.com/sekaneko13/status/770932165844480000", ["△", "最終回単行本"]),
  entry("おじさんと女子高生", "加藤マユミ", "katomayumi", "完結アーカイブ型", "https://x.com/katomayumi/status/583614407931924482", ["◎", "完結"]),
  entry("先輩がうざい後輩の話", "しろまんた", "shiromanta1020", "完結アーカイブ型", "https://x.com/shiromanta1020/status/740376270383415296", ["◎", "更新終了"]),
  entry("出会い系サイトで妹と出会う話", "もちオーレ", "konpuudo", "完結アーカイブ型", "https://x.com/konpuudo/status/812437982187663361", ["○", "アーカイブ"]),
  entry("ハンバーガーちゃん絵日記", "ハンバーガー", "HundredBurger", "完結アーカイブ型", "https://x.com/HundredBurger/status/985123481057554433", ["○", "更新終了"]),
  entry("おじさまと猫", "桜井海", "umi_sakai", "試し読み・外部誘導型", undefined, ["◎", "pixivコミック"]),
  entry("スーパーの裏でヤニ吸うふたり", "地主", "ji_chiku", "試し読み・外部誘導型", undefined, ["◎", "商業連載"]),
  entry("新しい上司はど天然", "いちかわ暖", "ichikawa_haru", "試し読み・外部誘導型", undefined, ["◎", "外部連載"]),
  entry("氷属性男子とクールな同僚女子", "殿ヶ谷美由記", "tonogayamiyuki", "試し読み・外部誘導型", undefined, ["◎", "ガンガンpixiv"]),
  entry("休日のわるものさん", "森川侑", "m_yu_morikawa", "試し読み・外部誘導型", undefined, ["◎", "商業連載"]),
  entry("可愛いだけじゃない式守さん", "真木蛍五", "makiko1115", "試し読み・外部誘導型", undefined, ["◎", "商業連載"]),
  entry("絶対BLになる世界VS絶対BLになりたくない男", "紺吉", "konjiki", "試し読み・外部誘導型", undefined, ["◎", "外部媒体"]),
  entry("オフ会したらとんでもないやつが来た話", "mii.m", "mii_mii", "試し読み・外部誘導型", undefined, ["◎", "単行本"]),
  entry("善良な不良高校生の日常", "立葵", "tachiaoi", "試し読み・外部誘導型", undefined, ["◎", "単行本"]),
  entry("こどもどろぼう", "山吹", "yamabuki", "試し読み・外部誘導型", undefined, ["◎", "モーニング"]),
  entry("アフターメルヘン", "田島生野", "ikuno_tajima", "試し読み・外部誘導型", undefined, ["◎", "単行本"]),
  entry("魔法少女、轢いた", "長谷川シグリオ", "shigurio", "試し読み・外部誘導型", undefined, ["◎", "外部掲載"]),
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
      <div className="section-heading"><div><p className="eyebrow"><span /> WEB COMIC DIRECTORY</p><h2>第1話から、探す。</h2></div><p>いま読める <strong>{mangaList.length}</strong> 作品</p></div>
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
    <div className="card-content"><div className="card-genre">{manga.format}</div><h3>{manga.title}</h3><p className="author">{manga.author} <span>{manga.handle}</span></p><p className="summary">{manga.summary}</p><div className="tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{manga.xPostUrl ? <a className="read-link" href={manga.xPostUrl} target="_blank" rel="noreferrer">Xで{manga.entryLabel} <span>→</span></a> : <span className="read-link is-pending">公式ポストを確認中 <span>—</span></span>}</div>
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
