const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/**/*.html'],
  darkMode: false,
  theme: {
    extend: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif']
        },
        colors: {
            orange: colors.orange
        },
        typography: theme => ({
            DEFAULT: {
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
                        borderRadius: theme('borderRadius.lg')
                    },
                    'code::before': { content: '' },
                    'code::after': { content: '' }
                }
            }
        })
    }
  },
  plugins: [ require('@tailwindcss/typography') ]
}
