// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import { customPosts } from "./src/lib/custom-posts.ts";

// Drafts are built so they open by URL, but stay out of the sitemap.
const postsDir = "./src/content/posts";
const draftSlugs = new Set([
  ...fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
      const frontmatter = fs.readFileSync(`${postsDir}/${file}`, "utf8").match(/^---\n([\s\S]*?)\n---/);
      return /^draft:\s*true\s*$/m.test(frontmatter?.[1] ?? "");
    })
    .map((file) => file.slice(0, -3)),
  ...customPosts.filter((post) => post.draft).map((post) => post.id),
]);

export default defineConfig({
  site: "https://ben.page",
  integrations: [
    sitemap({
      filter: (page) => !draftSlugs.has(new URL(page).pathname.slice(1)),
    }),
  ],
  adapter: vercel(),
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },

  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      OPENAI_API_KEY: envField.string({ context: 'server', access: 'secret', })
    }
  }
});
