import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import wikilinks from "./src/remark/wikilinks.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx()],
  site: "https://benborgers.com",
  build: {
    format: "file",
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    remarkPlugins: [wikilinks],
    extendDefaultPlugins: true,
  },
});
