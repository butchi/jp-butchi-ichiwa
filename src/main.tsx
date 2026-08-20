import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { MangaDirectory } from "../app/MangaDirectory";
import { MangaDetail } from "../app/MangaDetail";
import "../app/globals.css";

const match = window.location.pathname.match(/^\/manga\/([^/]+)\/?$/);

const root = document.getElementById("root")!;
const page = (
  <StrictMode>
    {match ? <MangaDetail slug={decodeURIComponent(match[1])} /> : <MangaDirectory />}
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
