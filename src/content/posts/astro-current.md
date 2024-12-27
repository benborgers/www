---
title: How to highlight the current page’s link with Astro
date: 2024-12-26
unlisted: true
---

Often, you want to build a nav bar where the current page's link is styled differently (highlighted, underlined, etc).

With [Astro](https://astro.build), you can do that easily, without any JS framework:

```jsx
<nav>
    <a href="/" class:list={[Astro.url.pathname === "/" && "underline"]}>Home</a>
    <a href="/about" class:list={[Astro.url.pathname === "/about" && "underline"]}>About</a>
    <a href="/contact" class:list={[Astro.url.pathname === "/contact" && "underline"]}>Contact</a>
</nav>
```

The important part is that we're checking the current path, `Astro.url.pathname`, against the `href` of the link:

```js
Astro.url.pathname === "/about"
```

That `Astro` global variable is available in any `.astro` file.

To get this working when deployed, you may also have to modify your Astro config to enforce consistent URLs:

```js
// astro.config.mjs

export default defineConfig({
  // The rest of your config here...
  trailingSlash: "never",
})
```
