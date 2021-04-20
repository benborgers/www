---
title: How to have multiple variants of TailwindCSS Typography
date: 2020-02-12
---

I wanted to use Tailwind's typography plugin (which lets you use the `prose` class to style any document) in multiple places on my site, but I wanted to have two different variations that I could use in different places.

You can already customize the plugin's styles, but I wanted to generate two differently tweaked versions.

In my `tailwind.config.js` file, I added two different variants for the typography plugin:

```javascript
// tailwind.config.js

const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      typography: theme => ({
        blog: {
          css: {
            a: {
              color: theme('colors.red.600'),
            }
          }
        },
        support: {
          css: {
            a: {
              color: theme('colors.blue.700')
            }
          }
        }
      })
    }
  },
  plugins: [ require('@tailwindcss/typography') ]
}
```

This simple example creates two variants: `blog`, which has red links, and `support`, which has blue links. I can use the variants like this:

```html
<div class="prose prose-blog"></div>
<div class="prose prose-support"></div>
```

This allows me to use two tweaked versions of the `prose` class side-by-side in the same project.

Bonus: when tweaking the theme in `tailwind.config.js`, I often find it useful to refer back to [the default styles that `@tailwindcss/typography` applies](https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js).
