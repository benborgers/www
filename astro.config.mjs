// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://benborgers.com",
  integrations: [react(), sitemap()],
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },

  devToolbar: {
    enabled: false,
  },
});
