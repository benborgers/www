---
title: Calculating related posts on my blog using vector embeddings
date: 2025-10-07
draft: false
starred: false
unlisted: false
---
You might notice that, somewhere on this page (depending on the redesign I'm not sure where) there should be a list of "related posts."

![](/posts/related-posts/ui.png)

I built it a few months ago, and it's surprisingly good at surfacing further posts to read from my archive of blog posts.

It uses the [`@huggingface/transformers`](https://www.npmjs.com/package/@huggingface/transformers) package and a local embeddings model (I chose `Xenova/gte-small`) to vector embed every blog post. That means it doesn't cost me anything, and everything happens locally at build time!

After the embeddings are calculated, it finds the most similar 3 other blog posts, provided that they are similar *enough*.

The code is all in this file on my GitHub: [`related-posts.ts`](https://github.com/benborgers/www/blob/main/src/lib/related-posts.ts)

Calculating the embeddings for each post does take a bit of time, and since new blog posts are relatively rare, I cache the list of embeddings between site deployments. (My favorite place to cache things is in the `node_modules` folder, because it works well and feels sneaky.)

I was surprised by how well this *just worked*, even with an open source low-power embedding model! It often draws connections between posts that I wouldn't have thought of immediately, but that make total sense when you see it.
