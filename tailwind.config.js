const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.astro"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
