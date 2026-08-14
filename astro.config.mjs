// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

const portalUrl = process.env.PUBLIC_URL
  ? new URL(process.env.PUBLIC_URL)
  : undefined;

export default defineConfig({
  site: "https://ben.page",
  integrations: [sitemap()],
  adapter: vercel(),
  trailingSlash: "never",

  security: portalUrl
    ? {
        allowedDomains: [
          { protocol: portalUrl.protocol.slice(0, -1), hostname: portalUrl.hostname },
        ],
      }
    : undefined,

  vite: {
    plugins: [tailwindcss()],
    server: portalUrl
      ? {
          allowedHosts: [portalUrl.hostname],
          cors: {
            origin: [portalUrl.origin, /^https:\/\/([a-z0-9-]+\.)*ampcode\.com$/],
          },
        }
      : undefined,
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
