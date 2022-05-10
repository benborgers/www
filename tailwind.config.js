const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./resources/**/*.blade.php"],
    theme: {
        extend: {
            fontFamily: {
                fraunces: ["Fraunces", ...defaultTheme.fontFamily.serif],
                "public-sans": ["Public Sans", ...defaultTheme.fontFamily.sans],
                rounded: [
                    "ui-rounded",
                    "SF Pro Rounded",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("postcss-100vh-fix"),
    ],
};
