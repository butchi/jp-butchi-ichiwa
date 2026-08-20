import { mkdir, readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://ichiwa.butchi.jp";
const mangaSource = new URL("../app/MangaDirectory.tsx", import.meta.url);
const indexTarget = new URL("../dist/index.html", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);

const source = await readFile(mangaSource, "utf8");
const slugs = [...source.matchAll(/^\s*entry\("([^"]+)"/gm)].map((match) => match[1]);

if (slugs.length === 0) {
  throw new Error("No active manga entries were found.");
}

const indexHtml = await readFile(indexTarget, "utf8");

for (const slug of new Set(slugs)) {
  const pageUrl = `${siteUrl}/manga/${encodeURIComponent(slug)}`;
  const html = indexHtml
    .replace(
      '<link rel="canonical" href="https://ichiwa.butchi.jp/" />',
      `<link rel="canonical" href="${pageUrl}" />`,
    )
    .replace(
      '<meta property="og:url" content="https://ichiwa.butchi.jp/" />',
      `<meta property="og:url" content="${pageUrl}" />`,
    );

  if (html === indexHtml) {
    throw new Error("Could not update canonical or og:url in the HTML template.");
  }

  const pageDirectory = new URL(`manga/${encodeURIComponent(slug)}/`, distRoot);
  await mkdir(pageDirectory, { recursive: true });
  await writeFile(new URL("index.html", pageDirectory), html, "utf8");
}

console.log(`Generated ${new Set(slugs).size} manga detail pages.`);
