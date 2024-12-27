---
title: Website redesign, December 2024
date: 2024-12-27
---

I seem to redesign my website 2-3 times per year.

I do it at all times of the year, but I always seem to be redesigning around Christmas: in 2021, [2022](/redesign-december-2022), 2023, and now.

<figure>
  <img src="/posts/redesign-december-2024/2021.png" />
  <figcaption>December 2021</figcaption>
</figure>

<figure>
  <img src="/posts/redesign-december-2024/2022.png" />
  <figcaption>
    <a href="/redesign-december-2022">
      December 2022
    </a>
  </figcaption>
</figure>

<figure>
  <img src="/posts/redesign-december-2024/2023.png" />
  <figcaption>December 2023</figcaption>
</figure>

<figure>
  <img src="/posts/redesign-december-2024/2024.png" />
  <figcaption>December 2024</figcaption>
</figure>

There's more versions in between these screenshots too, but I consistently seem to be tinkering on [winter break](/winter23).

And this winter break is no different! I started in the airport on 12/25 on the way to Charleston, South Carolina, and I pushed it live a day and a half later.

## What's it look like?

I've done this enough times to realize that I should be taking more screenshots for posterity. In addition to the one above, this is what an individual blog post looks like on my December 2024 redesign:

![](/posts/redesign-december-2024/2024-2.png)

## Why a redesign?

Here's what my previous iteration looked like:

![](/posts/redesign-december-2024/prev-1.png)
![](/posts/redesign-december-2024/prev-2.png)

I really liked it, especially the sidebar, but writing on it started to feel *precious*. The posts were styled to look upright and professional.

For this new iteration, I wanted something that felt less precious. The new feed of posts on the front page makes me feel like I can fire off posts.

The ultimate intention is always to write more. We'll see.

## Architecture

It's an [Astro](https://astro.build) site, with posts written in markdown (via [content collections](https://docs.astro.build/en/guides/content-collections)), styled with [Tailwind](https://tailwindcss.com), and with icons from [Phosphor](https://phosphoricons.com).

I always start by initializing a new repository, starting fresh with `npm create astro@latest`. I don't know why — it just feels cleaner to start fresh and then move the markdown over. It's like cleaning your house by buying a new one and moving all the furniture.

I'm often tempted to switch back to a CMS, or (even worse) _build my own CMS_, but I'm in reality glad that I've kept everything in markdown in recent iterations. It makes my writing a lot more portable. I'm also enjoying [MarkEdit](https://github.com/MarkEdit-app/MarkEdit) for writing posts in markdown.

I've also moved the domain from `ben.page` back to `benborgers.com`, but that's a story for another time...
