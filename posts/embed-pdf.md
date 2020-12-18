---
title: How to embed a PDF in HTML
date: 2020-04-29
tags:
    - programming
---
As of now, there's no good way to embed a PDF right into HTML.

Trust me, I looked.

Everything you think would work (`iframe`, `object`, everything) has issues — it doesn't work in certain browsers, it doesn't work on mobile, on and on.

A workaround I settled on was using an `iframe` containing Google's PDF viewer:

```html
<iframe
  src="https://docs.google.com/viewer?embedded=true&url=URL_TO_PDF"
/>
```

Pretty good! The only pesky problem was the "open in" arrow at the top right corner, which opens up Google Drive.

I didn't want that, so I positioned a `div` with the same background color as my website on top of it. Not a great solution, but it worked:

```html
<div class="wrapper">
  <iframe src="..." />
  <div class="overlay" />
</div>

<style>
  .wrapper {
    position: relative;
  }

  .overlay {
    background-color: var(--site-background-color);
    height: 44px;
    width: 52px;
    position: absolute;
    top: 12px;
    right: 0;
  }
</style>
```

Now, `.overlay` is sitting on top of the `iframe`, covering the top right area where the button is.
