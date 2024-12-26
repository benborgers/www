// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ben.page",

  integrations: [tailwind(), react()],

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
