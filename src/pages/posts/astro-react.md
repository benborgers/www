---
layout: ../../layouts/post.astro
title: How to use React components in Astro
date: 2021-07-07
---

In [Astro](https://astro.build), you can have some components that are in React while the rest of your site is in Astro's own templating language (or Vue, Svelte, etc).

First create your component, with a filename such as `src/components/Counter.jsx`. In there, write a standard React component:

```jsx
import React from 'react'

export default function Counter() {
    return (
        <div>Hello, world!</div>
    )
}
```

Next up, in your `astro.config.mjs` file add the React renderer (in addition to whatever else is already in this configuration file)

```js
export default {
    renderers: ['@astrojs/renderer-react']
}
```

Now, you can import and use the React component in any `.astro` page:

```js
---
import Counter from '../components/Counter.jsx'
---

<Counter client:load />
```

Where the `client:load` option is specified in the code above, there are four options:

- `<Counter client:load />` renders the component on page load.
- `<Counter client:idle />` renders the component as soon as the browser has some free time.
- `<Counter client:visible />` renders the component only once it is scrolled into view.
- `<Counter />` (with no option specified) renders an HTML-only version of the component, so any click handlers or state won't work.
