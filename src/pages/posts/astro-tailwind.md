---
layout: ../../layouts/post.astro
title: How to use Tailwind CSS with Astro
date: 2021-06-16
---

Astro has first-class support for [Tailwind](https://tailwindcss.com), so it's really easy to add Tailwind's JIT compiler to your Astro website.

Just install Tailwind:

```bash
npm install --save-dev tailwindcss
```

And create a file at `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}']
}
```

And point your `astro.config.mjs` file to that Tailwind configuration file:

```js
// astro.config.mjs
export default {
    devOptions: {
        tailwindConfig: './tailwind.config.js'
    }
}
```

Now, create a global stylesheet in the `public/` folder, which I called `public/global.css`. In it, add the `@tailwind` directives that will output Tailwind's styles:

```css
/* public/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, include this CSS file in the `<head>` of HTML pages, and Tailwind CSS will work in your project!

```html
<head>
    <link rel="stylesheet" href="/global.css">
</head>
```
