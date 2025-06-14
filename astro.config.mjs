// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://benborgers.com",
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
