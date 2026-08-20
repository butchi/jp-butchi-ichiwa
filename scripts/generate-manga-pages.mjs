import { mkdir, readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://ichiwa.butchi.jp";
const mangaSource = new URL("../app/MangaDirectory.tsx", import.meta.url);
const indexTarget = new URL("../dist/index.html", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);
const serverEntry = new URL("../.prerender/entry-server.js", import.meta.url);

const source = await readFile(mangaSource, "utf8");
const slugs = [...source.matchAll(/^\s*entry\("([^"]+)"/gm)].map((match) => match[1]);

if (slugs.length === 0) {
  throw new Error("No active manga entries were found.");
}

const indexHtml = await readFile(indexTarget, "utf8");
const { getMangaPage, renderMangaPage } = await import(serverEntry.href);

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const serializeJsonLd = (data) => JSON.stringify(data, null, 2)
  .replaceAll("<", "\\u003c");

for (const slug of new Set(slugs)) {
  const manga = getMangaPage(slug);
  if (!manga) {
    throw new Error(`Could not find manga data for ${slug}.`);
  }

  const pageUrl = `${siteUrl}/manga/${encodeURIComponent(slug)}`;
  const pageTitle = `${manga.title}｜いちわ`;
  const pageDescription = manga.summary;
  const pageKeywords = [manga.title, manga.author, manga.genre, ...manga.tags].join(", ");
  const authorUrl = manga.handle.startsWith("@") ? `https://x.com/${manga.handle.slice(1)}` : undefined;
  const pageJsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#work`,
    name: manga.title,
    url: pageUrl,
    description: pageDescription,
    inLanguage: "ja",
    genre: manga.genre,
    keywords: manga.tags.join(", "),
    author: {
      "@type": "Person",
      name: manga.author,
      url: authorUrl,
    },
    sameAs: manga.xPostUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "いちわ",
      url: `${siteUrl}/`,
    },
  });
  const html = indexHtml
    .replace("<title>いちわ｜Xで読めるWeb漫画の第1話・最新話一覧</title>", `<title>${escapeHtml(pageTitle)}</title>`)
    .replace('name="description" content="Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。"', `name="description" content="${escapeHtml(pageDescription)}"`)
    .replace('<meta name="robots"', `<meta name="keywords" content="${escapeHtml(pageKeywords)}" />\n    <meta name="robots"`)
    .replace(
      '<link rel="canonical" href="https://ichiwa.butchi.jp/" />',
      `<link rel="canonical" href="${pageUrl}" />`,
    )
    .replace('<link rel="alternate" href="https://ichiwa.butchi.jp/" hreflang="ja" />', `<link rel="alternate" href="${pageUrl}" hreflang="ja" />`)
    .replace('<link rel="alternate" href="https://ichiwa.butchi.jp/" hreflang="x-default" />', `<link rel="alternate" href="${pageUrl}" hreflang="x-default" />`)
    .replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />')
    .replace('<meta property="og:locale" content="ja_JP" />', `<meta property="og:locale" content="ja_JP" />\n    <meta property="article:section" content="${escapeHtml(manga.genre)}" />${authorUrl ? `\n    <meta property="article:author" content="${authorUrl}" />` : ""}`)
    .replace('property="og:title" content="いちわ｜Xで読めるWeb漫画の第1話・最新話一覧"', `property="og:title" content="${escapeHtml(pageTitle)}"`)
    .replace('property="og:description" content="Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。"', `property="og:description" content="${escapeHtml(pageDescription)}"`)
    .replace(
      '<meta property="og:url" content="https://ichiwa.butchi.jp/" />',
      `<meta property="og:url" content="${pageUrl}" />`,
    )
    .replace('<meta property="og:image" content="https://ichiwa.butchi.jp/og-image.png" />\n    <meta property="og:image:width" content="1280" />\n    <meta property="og:image:height" content="800" />\n    <meta property="og:image:type" content="image/png" />\n    <meta property="og:image:alt" content="いちわ - Xで読めるWeb漫画の第1話一覧" />\n', "")
    .replace('<meta name="twitter:image" content="https://ichiwa.butchi.jp/og-image.png" />\n    <meta name="twitter:image:alt" content="いちわ - Xで読めるWeb漫画の第1話一覧" />\n', "")
    .replace('name="twitter:title" content="いちわ｜Xで読めるWeb漫画の第1話・最新話一覧"', `name="twitter:title" content="${escapeHtml(pageTitle)}"`)
    .replace('name="twitter:description" content="Xで読めるWeb漫画の第1話を探せる作品一覧。作者、キャラクター、最新話、全巻、映画・アニメ化の公式情報への入口をまとめています。"', `name="twitter:description" content="${escapeHtml(pageDescription)}"`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n      ${pageJsonLd}\n    </script>`)
    .replace(/\s*<main id="seo-fallback"[\s\S]*?<\/main>\s*/, "\n    ")
    .replace('<div id="root"></div>', `<div id="root">${renderMangaPage(slug)}</div>`);

  if (!html.includes(`canonical" href="${pageUrl}`) || !html.includes(`og:url" content="${pageUrl}`)) {
    throw new Error(`Could not update URL metadata for ${slug}.`);
  }

  const pageDirectory = new URL(`manga/${encodeURIComponent(slug)}/`, distRoot);
  await mkdir(pageDirectory, { recursive: true });
  await writeFile(new URL("index.html", pageDirectory), html, "utf8");
}

console.log(`Generated ${new Set(slugs).size} manga detail pages.`);
