const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        '_site/**/*.html'
    ],
    darkMode: false,
    theme: {
        extend: {
            typography: theme => ({
                DEFAULT: {
                    css: {
                        a: {
                            color: theme('colors.blue.600')
                        }
                    }
                }
            })
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
