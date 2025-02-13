---
title: "Good Software Has a Clear Geography"
date: 2022-02-01
---

I think that one of the most important things when building good software is that **the user always knows where they are, relative to the app’s geography**.

For me, not knowing where I am in an app’s navigational structure is disorienting and overwhelming. If I’m four pages deep and don’t understand where I am anymore, I feel like I don’t know how to navigate this app confidently. I don’t feel like I have a good grip on what’s going on.

That’s why I try to have really clear geographical indicators in apps I make. I want people to quickly have a sense of the app’s hierarchy, and where they are within that hierarchy.

There’s a couple ways that I’ve tried to indicate geographical location in apps:

![](/posts/breadcrumbs/image-2.png)

“Breadcrumbs” show the navigational hierarchy.

The first way is through the use of “breadcrumbs”, which are quite common. They’re a super simple but effective way of showing where the user is in the app, and invokes a sense of hierarchy.

From the screenshot above, you can understand that the Edit page for “Updates from Ben Borgers” is under the general page for “Updates from Ben Borgers”, which is in turn under the overarching Dashboard. There’s a clear sense that things are organized in a reasonable way.

![](/posts/breadcrumbs/image-1.png)

Seeing the last page under the current page.

Another solution that I’ve gone with in a different app is the idea of being able to see the last page poking up behind the current page. It’s heavily inspired by [Basecamp](https://basecamp.com):

![](/posts/breadcrumbs/image-3.png)

I stole this idea from Basecamp.

I like the depth that it gives, relating the current page with what came before it. The link also gives a really easy way to return to the previous page, and gives context about what you would be returning to.

![](/posts/breadcrumbs/image.png)

Clicking the “How do students join?” link opens a “modal” that overlays the rest of the interface.

Lastly, it helps to make use of overlaying bits over the current interface instead of directing the user to another page and then back again. This way, the whole interaction feels “lighter” — it all happened on the same page, and you weren’t pulled from one page to another and then back again.

The goal is to make software as non-disorienting as possible. The app should get its own geography straight, and then it should make that geography visible to the user.
