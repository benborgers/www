const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.astro"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      fontFamily: {
        sans: ["'Public Sans'", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
