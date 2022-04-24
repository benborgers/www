module.exports = {
    content: ["./resources/**/*.blade.php"],
    theme: {
        extend: {
            fontFamily: {
                fraunces: ["Fraunces", "serif"],
                "public-sans": ["Public Sans", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
