import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://ichiwa.butchi.jp";
const mangaSource = new URL("../app/MangaDirectory.tsx", import.meta.url);
const sitemapTarget = new URL("../public/sitemap.xml", import.meta.url);
const source = await readFile(mangaSource, "utf8");
const slugs = [...source.matchAll(/^\s*entry\("([^"]+)"/gm)].map((match) => match[1]);

if (slugs.length === 0) {
  throw new Error("No active manga entries were found.");
}

if (new Set(slugs).size !== slugs.length) {
  throw new Error("Duplicate manga slugs were found.");
}

const lastmod = new Date().toISOString().slice(0, 10);
const urls = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...slugs.map((slug) => ({ path: `/manga/${slug}`, changefreq: "weekly", priority: "0.8" })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.flatMap(({ path, changefreq, priority }) => [
    "  <url>",
    `    <loc>${siteUrl}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");

await writeFile(sitemapTarget, xml, "utf8");
console.log(`Generated sitemap with ${urls.length} URLs.`);
