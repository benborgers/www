---
title: Website Rewrite 2
date: 2022-05-19
---

Two weeks ago, I rewrote my personal website [again](/rewrite).

This time, I rewrote it using [Laravel](https://laravel.com). My theory is that Laravel is super flexible and will let me do _anything_ I want, so maybe I’ll stick with the framework this time.

Of course, that’s been the hope with every rewrite in the past, including that time I rewrote my website in Laravel.

I actually kept the design the same, mostly just recreating the old site. I added a photo of myself on the homepage though, so visitors can imagine what I look like.

![](/posts/rewrite-2/169405416-c72e6c5a-b52d-4568-ae86-05788fc85a1b.png)

I initially moved my editing interface to [Laravel Filament](https://filamentphp.com), but got fed up with the editor that came built in.

So instead, I moved editing blog posts to GitHub Issues. (For those unfamiliar, GitHub is a place where developers save their code, and Issues is a feature for keeping track of bugs with your code.) I’m abusing Issues by making each “issue” a blog post, and using tags to keep track of drafts, etc.

![](/posts/rewrite-2/169405662-7bab5f60-41e6-42f3-8ebc-e7acc1fa25ba.png)

I really like using GitHub’s markdown writing editor, so I’m liking this setup!

_For those technically-minded: I cache the GitHub issues in Redis, and have a webhook set up in GitHub that refreshes that cache every time a GitHub issue is edited._

I also added an email newsletter for my blog. I send it weekly, with updates about things that I find interesting and links to my blog posts from the last week. I have a quite rudimentary setup, where I store email addresses in my Laravel app’s database and then send emails by pasting email addresses into my personal email client.

![](/posts/rewrite-2/169405928-74847682-28f0-4462-ab37-8ba8f97fa816.png)

The biggest thing that I’ve added with this website rewrite is free-form pages. They’re pages that aren’t blog posts, which I also write in GitHub Issues.

![](/posts/rewrite-2/169406094-413d1025-5202-4c62-914d-66d40dbc8f4d.png)

The idea for these pages came out of me wanting to [publish class notes](/publishing-class-notes) and make my website [more like a library](/library).

Because of that, there’s no centralized index of all the free-form pages: they’re simply linked together where it makes sense.

My hope is that I’ll start adding other types of writing to my website that don’t make sense as blog posts: for example, notes from a programming course or summaries of Black Mirror episodes. In the fall, I want to use these free-form pages to write up notes from all of the classes I’m taking.
