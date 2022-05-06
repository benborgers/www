module.exports = {
    content: ["./resources/**/*.blade.php"],
    theme: {
        extend: {
            fontFamily: {
                fraunces: ["Fraunces", "serif"],
                "public-sans": ["Public Sans", "sans-serif"],
                "sf-rounded": ["SFRounded", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("postcss-100vh-fix"),
    ],
};
