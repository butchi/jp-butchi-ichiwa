import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import { renderMangaPageHtml } from "./scripts/manga-page-template.mjs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "manga-detail-static-html",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
          const match = pathname.match(/^\/manga\/([^/]+)\/?$/);
          if (!match) {
            next();
            return;
          }

          try {
            const { getMangaPage, renderMangaPage } = await server.ssrLoadModule("/src/entry-server.tsx");
            const manga = getMangaPage(decodeURIComponent(match[1]));
            if (!manga) {
              next();
              return;
            }

            const template = await readFile("index.html", "utf8");
            const html = await server.transformIndexHtml(
              pathname,
              renderMangaPageHtml(template, manga, renderMangaPage(manga.slug)),
            );
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(html);
          } catch (error) {
            next(error as Error);
          }
        });
      },
    },
  ],
});
