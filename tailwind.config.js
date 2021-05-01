const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./**/*.{js,jsx,mdx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                rose: colors.rose
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            },
            typography: theme => ({
                DEFAULT: {
                    css: {
                        code: {
                            backgroundColor: theme('colors.gray.100'),
                            paddingLeft: theme('spacing.1'),
                            paddingRight: theme('spacing.1'),
                            paddingTop: theme('spacing["0.5"]'),
                            paddingBottom: theme('spacing["0.5"]'),
                            borderRadius: theme('borderRadius.md')
                        },
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' }
                    }
                }
            })
        }
    },
    variants: {
        extend: {},
    },
    plugins: [ require('@tailwindcss/typography') ]
}
