---
title: "How to remove hash from URL with JavaScript"
date: 2021-01-24
---
You usually clear the URL hash like this:

```javascript
location.hash = ""
```

However, that leaves a `#` at the end of the URL. You can remove the `#` by adding a line of code:

```javascript
location.hash = ""
history.replaceState("", "", location.pathname)
```

The second line overwrites the URL with the current URL, minus the `#`.