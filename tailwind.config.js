module.exports = {
  purge: [],
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
                    }
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
