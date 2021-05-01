---
title: "How to set and delete cookies with Express"
date: 2021-01-24
---
## Setting cookies

```jsx
res.cookie("token", MY_TOKEN, { maxAge: MILLISECONDS_FROM_NOW_TO_EXPIRE })
```

There's more options (other than `maxAge`) described in the [Express documentation](https://expressjs.com/en/api.html#res.cookie).

## Deleting cookies

```jsx
res.clearCookie("token")
```