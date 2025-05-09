---
title: "The Cost of Building an Idea"
date: 2022-04-04
---

I usually use a framework called [Laravel](https://laravel.com/) to build web apps for my side projects.

One nice thing about Laravel is that the team behind the free framework also built [Laravel Vapor](https://vapor.laravel.com/), a paid app that helps you host Laravel apps. It’s purpose-built for Laravel, so it’s really good at its job.

Vapor hosts your apps on Amazon Web Services in a really _scalable_ way — when you receive more traffic, your app automatically is able to support more traffic without you needing to increase the size of your server.

The downside is that scalable often means expensive. The cheapest database on Amazon Web Services was $15/month, which means that if I want to build out a new idea and put it onto the internet I have to pay around $18/month at least ($15 for the database, plus a bit more for the actual app’s servers).

I think that this cost made me suppress building some apps, since I knew that each app I’d build would add a good amount to my bill. It wasn’t an unreasonable amount of money, but enough that it didn’t feel like it was worth it to build small apps for myself or just to try things out.

I tried to get around this in two ways: first, I consolidated all of my apps to use a single $25/month database. It worked, but databases have a limit to how many apps you can connect to them before they start to break down. So still, every less-important app I was attaching to this one database felt like it was using up the database’s limits.

Secondly, I looked to other ways to build apps. There’s a trope that programmers are always gravitating towards the shiny new thing, and that’s definitely true for me. I tried out new frameworks, hoping to find something that I could switch to that would be cheaper to host. But in the end, I didn’t find something that matched how productive I felt with Laravel.

But recently, I’ve found a solution: [Laravel Forge](https://forge.laravel.com). Years before Vapor, the team behind Laravel also built Forge. It’s the same idea as Vapor—hosting specifically for Laravel apps—but it hosts your apps in a less-hyperscale way. You give Forge permission to create servers of a fixed size in your accounts with hosting companies, and they run your app onto that server.

With Forge, the cheapest I can host an app is $5-6/month. And the whole app runs within its own server, without needing to share a database with any other apps.

That mental reduction in price has been enough to make me happy with Laravel again. It feels like I can build whatever little apps I want, and not worry about the cost of hosting them.

And if I ever _do_ need that super-scale that Vapor provides (at a higher cost), I can upgrade the underlying server on Forge or uproot the entire app and move it to Vapor. Either way, I’ll figure it out if that ever happens — I figure that’d be a good problem to have :)
