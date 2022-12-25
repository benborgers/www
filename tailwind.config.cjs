const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".font-width-1": { "--font-width": "75" },
        ".font-width-2": { "--font-width": "85" },
        ".font-width-3": { "--font-width": "95" },
        ".font-width-4": { "--font-width": "105" },
        ".font-width-5": { "--font-width": "115" },
        ".font-width-6": { "--font-width": "125" },

        ".font-slant-0": { "--font-slant": "0" },
        ".font-slant-1": { "--font-slant": "1" },
        ".font-slant-2": { "--font-slant": "2" },
        ".font-slant-3": { "--font-slant": "3" },
        ".font-slant-4": { "--font-slant": "3" },
        ".font-slant-5": { "--font-slant": "5" },
        ".font-slant-6": { "--font-slant": "6" },
        ".font-slant-7": { "--font-slant": "7" },
        ".font-slant-8": { "--font-slant": "8" },
        ".font-slant-9": { "--font-slant": "9" },
        ".font-slant-10": { "--font-slant": "10" },
      });
    }),
  ],
};
