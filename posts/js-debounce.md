---
title: How to debounce with JavaScript
date: 2020-02-12
---

Here's a straightforward example of how to debounce an event that happens often in JavaScript:

```javascript
let timer

something.addEventListener('change', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        expensiveOperation()
    }, 2000)
})
```

Here, we assume that the `change` event is fired often, and we don't want to run the function `expensiveOperation()` every single time it's fired.

Instead, every time `change` happens, we set a timeout to run `expensiveOperation()` in `2000` milliseconds (or in two seconds). If `change` happens again before the two seconds have passed, we clear that timer and set a new one for two seconds in the future.

Once there _is_ a two second pause, the timer will not be cleared before it's executed, and `expensiveOperation()` will be run.

This ensures that `expensiveOperation` is only run when there is a two second pause in `change` events being fired.
