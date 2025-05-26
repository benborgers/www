// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://benborgers.com",
  integrations: [sitemap()],
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
});
