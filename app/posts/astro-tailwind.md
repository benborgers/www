---
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

Now, create a global stylesheet called `src/styles/global.css`. In it, add the `@tailwind` directives that will output Tailwind's styles:

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, import this CSS file in the `<head>` of HTML pages, and Tailwind CSS will work in your project!

```jsx
<head>
    <link
      rel="stylesheet"
      href={Astro.resolve('../styles/global.css')}
    >
</head>
```
