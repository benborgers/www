---
title: How to use KaTeX with Eleventy
slug: eleventy-katex
date: 2020-12-30T23:27:34.840Z
tags:
  - programming
  - eleventy
draft: false
---
When building this blog using Eleventy, I had some equations that I wanted to have rendered as LaTeX. I wrote them directly into the markdown of the posts, surrounded by two dollar signs: 

```markdown
One equation is $$e = mc^2$$.
```

There were a whole bunch of methods around extending the markdown renderer that I honestly didn't really understand. Finally, I just pulled together my own solution using [filters](https://www.11ty.dev/docs/filters/) to modify content. 

We're going to be making a filter called `extendMarkdown`, which adds our own custom features to markdown. Here we're just going to be adding KaTeX rendering, but you could add to this filter to give your markdown more abilities. 

First, go to the layout for your blog posts, and pipe the page's contents through an `extendMarkdown` filter:

```nunjucks
{# before #}
{{ content | safe }}

{# after #}
{{ content | extendMarkdown | safe }}
```

Now, we have to create that `extendMarkdown` filter. First, install KaTeX to render the math equations:

```bash
npm install katex
```

and import it in your `.eleventy.js` file: 

```javascript
const katex = require('katex')
```

Now, we can write the `extendMarkdown` filter: 

```javascript
eleventyConfig.addFilter('extendMarkdown', content => {
  return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
    const cleanEquation = equation
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')

    return katex.renderToString(cleanEquation, { throwOnError: false })
  })
})

What this does is it registers a new Eleventy filter called `extendMarkdown`, which will affect our `content` HTML (from earlier). 

We take the content of the page and use a regex to replace every occurrence of `$$something$$`. We're using `\$` to escape the dollar sign, because `$` has a special meaning in regex but we want the actual character (not its special meaning). 

When rendering markdown to HTML, Eleventy likes to change characters like `>` to `&gt;`, etc. This stops them from rendering as actual HTML. However, here we want to turn these characters _back_ into what they were before, since we might've used the `>` or `<` characters in our equations. 

We use KaTeX's `renderToString` method to render this equation so it looks like an actual equation, and replace the `$$something$$` with that rendered KaTeX HTML. 

Finally, add this CSS file to your layout's `<head>`. It loads the necessary fonts and CSS to render the equation we just created with `renderToString`. 

```html
<link rel="stylesheet" href="https://unpkg.com/katex@latest/dist/katex.min.css" />
```

And that's it! Now, any LaTeX written in your markdown in the format `$$equation here$$` will be beautifully rendered on the page. 