const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
        extend: {
            colors: {
                orange: colors.orange,
                pink: colors.pink,
                rose: colors.rose
            }
        }
    },
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('@tailwindcss/typography')]
}
