---
title: "How to get screen height in Expo"
date: 2021-01-24
---
The screen height can be retrieved using the `Dimensions` package:

```javascript
import Dimensions from "react-native"

Dimensions.get("window").height
```
