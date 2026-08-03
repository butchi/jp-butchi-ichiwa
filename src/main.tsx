import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MangaDirectory } from "../app/MangaDirectory";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MangaDirectory />
  </StrictMode>,
);
