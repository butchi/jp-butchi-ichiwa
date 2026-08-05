import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile, writeFile } from "node:fs/promises";

function sitemapLastmod() {
  return {
    name: "sitemap-lastmod",
    apply: "build" as const,
    async closeBundle() {
      const filePath = "dist/sitemap.xml";
      const today = new Date().toISOString().slice(0, 10);

      try {
        const xml = await readFile(filePath, "utf8");
        const next = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`);
        if (next !== xml) {
          await writeFile(filePath, next, "utf8");
        }
      } catch {
        // Skip silently when sitemap has not been emitted.
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapLastmod()],
});
