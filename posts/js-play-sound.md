---
title: How to play a sound effect with javascript
slug: js-play-sound
date: 2021-01-23T21:25:15.281Z
tags:
  - programming
  - javascript
draft: false
---
Playing a sound with pure javascript is surprisingly easy. First, you need a URL to the audio file you want to play. We'll use this one: 

```
https://www.w3schools.com/html/horse.mp3
```

Now, all it takes is two lines of code to play that sound file:

```javascript
const sound = new Audio('https://www.w3schools.com/html/horse.mp3')
sound.play()
```