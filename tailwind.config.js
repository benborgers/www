module.exports = {
    content: ["./resources/**/*.blade.php"],
    theme: {
        extend: {
            fontFamily: {
                fraunces: ["Fraunces", "serif"],
                "public-sans": ["Public Sans", "sans-serif"],
                inter: ["Inter", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
};
