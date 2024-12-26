// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://benborgers.com",
  integrations: [tailwind(), react(), sitemap()],
  adapter: vercel(),
  trailingSlash: "never",

  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },

  devToolbar: {
    enabled: false,
  },

  redirects: {
    "/rss.xml": "/rss",
    "/slowmochristian": "http://slowmochristian.ben.page",
    "/swipes": "http://swipes.ben.page",
    "/blog/[...slug]": "/[...slug]",
    "/posts/[...slug]": "/[..slug]",
  },
});
