/* eslint-disable @next/next/no-html-link-for-pages -- This Vite entry uses standard document navigation. */
"use client";

import { useEffect } from "react";
import { mangaList, type Manga, XPostEmbed } from "./MangaDirectory";

function Author({ manga }: { manga: Manga }) {
  return <p className="detail-author">{manga.author} {manga.handle.startsWith("@") ? <a className="author-handle" href={`https://x.com/${manga.handle.slice(1)}`} target="_blank" rel="noopener noreferrer" aria-label={`${manga.author}のXアカウント`}>{manga.handle}</a> : <span>{manga.handle}</span>}</p>;
}

export function MangaDetail({ slug }: { slug: string }) {
  const manga = mangaList.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = manga ? `${manga.title}｜いちわ` : "ページが見つかりません｜いちわ";
  }, [manga]);

  if (!manga) {
    return <main className="not-found"><p className="eyebrow"><span /> NOT FOUND</p><h1>作品が見つかりませんでした</h1><p>URLをご確認のうえ、作品一覧からお探しください。</p><a className="back-link" href="/#top">作品一覧へ戻る <span>→</span></a></main>;
  }

  const related = mangaList.filter((item) => item.slug !== manga.slug && item.tags.some((tag) => manga.tags.includes(tag))).slice(0, 3);

  return <main>
    <header className="site-header">
      <a className="brand" href="/#top" aria-label="いちわ ホーム"><span className="brand-mark">一</span><span>いちわ</span></a>
      <nav aria-label="メインナビゲーション"><a href="/#top">作品を探す</a></nav>
      <a className="submit-link" href="https://x.com/butchi_y">作品を掲載する (DM)<span>↗</span></a>
    </header>
    <article className="manga-detail">
      <a className="breadcrumb" href="/#top">← 作品一覧</a>
      <div className="detail-layout">
        <div className={`detail-post post-preview ${manga.accent}`}>
          {manga.xPostUrl ? <XPostEmbed url={manga.xPostUrl} label={`${manga.title} ${manga.entryLabel}`} /> : <div className="embed-pending"><span aria-hidden="true">𝕏</span><p>公式ポストを確認中</p><small>{manga.handle}</small></div>}
        </div>
        <div className="detail-content">
          <p className="eyebrow"><span /> {manga.format}</p>
          <h1>{manga.title}</h1>
          <Author manga={manga} />
          <p className="detail-summary">{manga.summary}</p>
          <dl className="detail-meta"><div><dt>ジャンル</dt><dd>{manga.genre}</dd></div><div><dt>公開形式</dt><dd>{manga.format}</dd></div></dl>
          <div className="tags detail-tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          {manga.xPostUrl ? <a className="detail-read-link" href={manga.xPostUrl} target="_blank" rel="noopener noreferrer">Xで第1話を読む <span>↗</span></a> : <p className="detail-pending">公式ポストを確認中です。</p>}
        </div>
      </div>
      {related.length > 0 && <section className="related-section"><p className="eyebrow"><span /> RELATED MANGA</p><h2>あわせて読みたい作品</h2><div className="related-list">{related.map((item) => <a href={`/manga/${item.slug}`} key={item.slug}><small>{item.format}</small><strong>{item.title}</strong><span>{item.author} →</span></a>)}</div></section>}
    </article>
    <footer><a className="brand footer-brand" href="/#top"><span className="brand-mark">一</span><span>いちわ</span></a><p>Web漫画の第1話が見つかる場所。</p><p className="copyright">© 2026 <a href="https://x.com/butchi_y">岩淵夕希物智</a></p></footer>
  </main>;
}
