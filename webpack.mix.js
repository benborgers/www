const mix = require("laravel-mix");

mix.disableNotifications();

mix.js("resources/js/app.js", "public/js")
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")])
    .postCss("resources/css/filament.css", "public/css");

if (mix.inProduction()) {
    mix.version();
}
