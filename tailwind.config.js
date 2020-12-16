const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        '_site/**/*.html'
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {

            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
