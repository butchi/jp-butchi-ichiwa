import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MangaDirectory } from "../app/MangaDirectory";
import { MangaDetail } from "../app/MangaDetail";
import "../app/globals.css";

const match = window.location.pathname.match(/^\/manga\/([^/]+)\/?$/);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {match ? <MangaDetail slug={decodeURIComponent(match[1])} /> : <MangaDirectory />}
  </StrictMode>,
);
