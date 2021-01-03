---
title: How to enable the tab key in a textarea
slug: textarea-tab
date: 2021-01-03T16:11:14.545Z
tags:
  - programming
draft: false
---
I was building a textarea meant for writing markdown, and I wanted users to be able to hit the `tab` key and insert an indent (for nesting bullet points, for example). 

This turned out to be quite straightforward, using just a bit of javascript. 

After adding the text box to my HTML: 

```html
<textarea></textarea>
```

The modification took a bit of javascript: 

```javascript
const textarea = document.querySelector('textarea')

textarea.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    e.preventDefault()

    textarea.setRangeText(
      '  ',
      textarea.selectionStart,
      textarea.selectionStart,
      'end'
    )
  }
})
```

This javascript adds a listener for whenever a key is pressed inside the textarea. If the `keyCode` is `9` (which is the key code for the `tab` key), we `preventDefault()` — this means preventing the browser's default behavior, which is usually leaving the textarea to go to the next element. 

Now, we use `setRangeText()`, which allows us to manipulate text in the textarea. We put two spaces, simulating a tab, at the point where the cursor currently is. `setRangeText()` usually overwrites text, but by telling it to start and end at the same spot (second and third arguments), it inserts it instead. Lastly, `end` moves the cursor to the end of the inserted text, which is the behavior we want. 

That's it! [Here's a CodeSandbox](https://codesandbox.io/s/textarea-tab-ivvhq?file=/index.html) demonstrating the solution. 