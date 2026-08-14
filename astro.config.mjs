// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ben.page",
  integrations: [sitemap()],
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
