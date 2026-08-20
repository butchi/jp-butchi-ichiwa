import { renderToStaticMarkup } from "react-dom/server";
import { MangaDetail } from "../app/MangaDetail";
import { mangaList } from "../app/MangaDirectory";

export function getMangaPage(slug: string) {
  return mangaList.find((manga) => manga.slug === slug);
}

export function renderMangaPage(slug: string) {
  return renderToStaticMarkup(<MangaDetail slug={slug} />);
}
