---
title: "How to add confetti to a website with JavaScript"
date: 2021-02-01
---
I wanted to add a falling confetti animation on a website, but I didn't want to code it all up myself. 

Instead, I found a super simple package that did it for me: [mathusummut/confetti.js](https://github.com/mathusummut/confetti.js/). 

Just insert this code before the closing `</body>` tag in your HTML: 

```html
<script src="https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js"></script>
<script>
    confetti.start()
</script>
```

That's it! Now your website has confetti in the background. 