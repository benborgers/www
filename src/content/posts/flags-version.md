---
title: Don't forget to set a minimum app version for your feature flags
date: 2025-10-10
cover_image: /posts/flags-version/cover_image.png
draft: false
starred: false
unlisted: false
---
Here's an important tidbit I learned at [Locket](https://locket.camera):

Let's say you're building a mobile app. You've got a new feature that you're incrementally shipping behind a feature flag.

(This is the right way to do it! No one huge PR with your entire feature in it that will result in merge conflict hell.)

While you're building it, versions of your app will go out with your half-finished work in it. But it's behind a flag, so that's fine!

Now it's release time. You flip the flag to `true`.

Big problem: everyone who's still on an older version of the app sees your half-finished work!

Coming from web development, I really had to internalize the idea that distinct versions of your app may be used *forever*.

Instead, set your feature flag to `true IF version >= N`. That way, your half-finished work will stay hidden in older versions of the app for people that are still on the older versions.
