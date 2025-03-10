---
title: Website redesign, December 2022
date: 2022-12-27
---

## Why a redesign?

Last summer I had the idea to move away from writing daily blog posts, and to instead create one-off creative “posts” (like [this one about a trip to Pittsburgh](https://pittsburgh.ben.page)).

A few months later, I realized that it wasn’t working: I just wasn’t finding the time to code these creative pages, because they required custom styling for everything.

I spent a few months thinking about what I wanted. In the end, **my goals were just to create a website where I can go back to blogging**, because I really enjoyed January to July of this year when I was writing a blog post every day.

## Things that were redesigned

### Architecture

The site is built using [Astro](https://astro.build), and styled with [Tailwind CSS](https://taiwindcss.com).

I’m writing in [Ghost](https://ghost.org), which is the blogging software that I used for most of my daily blogging era before I switched away from it.

Time, unfortunately, goes in circles, and I am back on Ghost.

I _really_ like the writing interface of Ghost, and it feels very solid and simple. I’m encouraged to write more, because it feels easy.

I host my own Ghost server on [Hetzner](https://www.hetzner.com/cloud), which isn’t super great, but it’s manageable. This site is using Ghost “headlessly,” meaning that the website you see is separate from Ghost. Only the writing is pulled in from Ghost via their API.

### Homepage

![](/posts/redesign-december-2022/2022-12-27-at-12.46.58@2x.png)

The homepage is quite standard, with four sections: Introduction, Blog, Work Experience, and Side Projects.

The main addition here is a Blog section on the homepage which shows my last four blog posts. I thought that it’d be a nice way of drawing attention to the blog, since I think that it’s the interesting part of my website.

### Blog

![](/posts/redesign-december-2022/2022-12-27-at-12.47.05@2x.png)

I’ve once again split [blog posts](https://benborgers.com/posts) from [technical blog posts](https://benborgers.com/technical-posts), since I think the technical posts aren’t really interesting to read unless you find them in Google (and were searching for the problem they solve).

This time I don’t link to the [list of technical blog](https://benborgers.com/technical-posts) posts _at all_, because I really don’t think they’re interesting. Maybe I should link to them somewhere though, just to humble-brag about having written 175+ of these posts. Not sure.

### Newsletter

I’ve added a newsletter signup form! It uses [Buttondown](https://buttondown.email), an app I’ve been freelancing for over the past year and a half.

Back when I was writing daily blog posts, people would visit my website every day to check for the new post, which was _very_ rewarding. But I don’t imagine that I’ll be back to the daily post cadence, so I want a way of telling people about new stuff.

### RSS

I’ve also added an RSS feed of new blog posts, if you prefer to keep up with the blog posts that way.

### Where’d everything else go?

Previously there were more pages on my website:

- [benborgers.com/swipes](https://benborgers.com/swipes)
- [benborgers.com/slowmochristian](https://benborgers.com/slowmochristian)
- [benborgers.com/pittsburgh](https://benborgers.com/pittsburgh)
- [benborgers.com/tufts](https://benborgers.com/tufts)
- [benborgers.com/tufts/cs86](https://benborgers.com/tufts/cs86) (+ notes for other classes in Fall 2022)

These pages came out of the idea that I should add creative pages to my website that weren’t all styled the same.

However, keeping them all under the same website made it hard to upgrade parts of the website and it felt a bit like a house of cards.

Therefore I’ve redirected all these pages to a new home under the `ben.page` domain, which I bought recently. Each of them is their own ([Astro](https://astro.build)) project and doesn’t interact with anything else.

That leaves this main website to be pure and simple — just a blog, essentially — while my more creative mini-websites can live happily as isolated projects.
