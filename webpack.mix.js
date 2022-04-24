const mix = require("laravel-mix");

mix.disableNotifications();

mix.js("resources/js/app.js", "public/js")
    .js("resources/js/filament.js", "public/js")
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);

if (mix.inProduction()) {
    mix.version();
}
