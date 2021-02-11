module.exports = {
  purge: ['./public/**/*.html'],
  darkMode: false,
  theme: {
    fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
    },
    extend: {
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
