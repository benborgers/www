// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://benborgers.com",
  integrations: [sitemap(), react(), keystatic()],
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
