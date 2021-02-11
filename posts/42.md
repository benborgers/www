---
title: "How to disable the "x-powered-by" header in Express"
date: 2021-01-24
---
[Express](https://expressjs.com) generates a header to your responses that says `x-powered-by: Express`.

If you want to clean up your headers, just add:

```jsx
app.disable("x-powered-by")
```

at the top of your javascript file.