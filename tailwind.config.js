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
    purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
    plugins: [require('@tailwindcss/typography')]
}
