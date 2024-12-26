// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://benborgers.com",

  integrations: [tailwind(), react(), sitemap()],

  trailingSlash: "never",

  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },

  devToolbar: {
    enabled: false,
  },
});
