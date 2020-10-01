module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    purge: ['./src/**/*.js'],
    theme: {
        typography: (theme) => ({
            default: {
                css: {
                    a: {
                        color: theme('colors.teal.700')
                    }
                }
            }
        })
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
