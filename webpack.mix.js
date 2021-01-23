const mix = require('laravel-mix')

mix.disableNotifications()

mix.postCss('resources/css/style.css', 'public/css', [
    require('tailwindcss'),
    require('autoprefixer')
])
