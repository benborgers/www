---
title: "How to disable Laravel Mix notifications"
date: 2021-01-24
---
Laravel Mix sends a desktop notification every time it re-compiles your assets, which can be pretty annoying.

To turn that off, add this line to your `webpack.mix.js` file:

```javascript
mix.disableNotifications()
```

Done! No more notifications from Laravel Mix.