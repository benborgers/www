const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
        extend: {
            colors: {
                orange: colors.orange,
                pink: colors.pink,
                rose: colors.rose
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        pre: {
                            color: theme('colors.gray.900'),
                            backgroundColor: theme('colors.gray.100')
                        }
                    }
                }
            })
        }
    },
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('@tailwindcss/typography')]
}
