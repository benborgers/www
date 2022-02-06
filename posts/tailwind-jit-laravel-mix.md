---
title: How to use Tailwind JIT with Laravel Mix
date: 2021-07-18
---

[Tailwind CSS](https://tailwindcss.com) now has a just-in-time compilation mode ("JIT mode"), which compiles only the CSS classes you use as you use them, even during development.

To enable it with Laravel Mix, you first need to install Laravel Mix. If you're using the [Breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze) or [Jetstream](https://jetstream.laravel.com) starter kits, you should already have Tailwind installed and a `tailwind.config.js` file already created.

Otherwise, run this command to install Tailwind CSS through npm and create a `tailwind.config.js` file:

```bash
npx tailwindcss init
```

Next, enable JIT mode in the Tailwind configuration file. In `tailwind.config.js`, set the `mode` to `jit`:

```js
module.exports = {
    mode: 'jit'
}
```

Create a CSS file at `resources/css/app.css` and fill it with this, which will get expanded by Laravel Mix into the full Tailwind CSS classes:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Add this to your `webpack.mix.js` file, pointing to the CSS file you just created and compiling it (from `resources/css/app.css` to its final destination at `public/css/app.css`):

```js
mix.postCss('resources/css/app.css', 'public/css', [
    require('tailwindcss')
])
```

Lastly: if the following scripts aren't already in your `package.json` file, add them:

```json
"scripts": {
    "dev": "npm run development",
    "development": "mix",
    "watch": "mix watch",
    "watch-poll": "mix watch -- --watch-options-poll=1000",
    "hot": "mix watch --hot",
    "prod": "npm run production",
    "production": "mix --production"
},
```

Now to use Tailwind JIT mode, run `npm run watch` and keep the terminal running while you edit HTML or Blade files. Your `public/css/app.css` file continuously be updated by Tailwind to match the classes that you've actually used.
