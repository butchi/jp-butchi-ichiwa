import { mkdir, readFile, writeFile } from "node:fs/promises";
import { renderMangaPageHtml } from "./manga-page-template.mjs";

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
await mkdir(new URL("manga/", distRoot), { recursive: true });

for (const slug of new Set(slugs)) {
  const manga = getMangaPage(slug);
  if (!manga) {
    throw new Error(`Could not find manga data for ${slug}.`);
  }

  const html = renderMangaPageHtml(indexHtml, manga, renderMangaPage(slug));

  const pageTarget = new URL(`manga/${encodeURIComponent(slug)}.html`, distRoot);
  await writeFile(pageTarget, html, "utf8");
}

console.log(`Generated ${new Set(slugs).size} manga detail pages.`);
