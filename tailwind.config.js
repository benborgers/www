module.exports = {
  purge: ['./resources/views/**/*.blade.php'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        typography: theme => ({
            DEFAULT: {
                css: {
                    a: {
                        color: theme('colors.blue.600'),
                        textDecoration: 'none'
                    },
                    pre: {
                        backgroundColor: theme('colors.gray.100'),
                        color: theme('colors.gray.700')
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
  variants: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/typography') ]
}
