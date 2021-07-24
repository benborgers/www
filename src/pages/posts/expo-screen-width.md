---
layout: ../../layouts/post.astro
title: "How to get screen width in Expo"
date: 2021-01-24
---
The screen width can be retrieved using the `Dimensions` package:

```javascript
import Dimensions from "react-native"

Dimensions.get("window").width
```