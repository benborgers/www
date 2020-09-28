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
                    },
                    br: {
                        display: 'block',
                        content: `''`,
                        marginTop: `${theme('spacing.4')} !important`
                    }
                }
            }
        })
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
