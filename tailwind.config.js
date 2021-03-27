const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./public/**/*.html'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                orange: colors.orange
            },
            fontFamily: {
                serif: ['Georgia', 'serif']
            },
            typography: theme => ({
                posts: {
                    css: {
                        a: {
                            color: theme('colors.blue.600'),
                            textDecoration: 'none'
                        },
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
                },
                garden: {
                    css: {
                        a: {
                            color: theme('colors.blue.700'),
                            textDecoration: 'none'
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.orange.200')
                        },
                        hr: {
                            borderColor: theme('colors.orange.200')
                        },
                        h2: { fontFamily: theme('fontFamily.sans').join(',') },
                        h3: { fontFamily: theme('fontFamily.sans').join(',') },
                        img: {
                            borderRadius: theme('borderRadius.md')
                        }
                    }
                }
            })
        }
    },
    plugins: [ require('@tailwindcss/typography') ]
}
