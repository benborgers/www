---
title: My coding agent has ads now
date: 2025-10-15
draft: false
starred: false
unlisted: false
---
One of my favorite coding agents, Amp, released a [free ad-supported version of their product today](https://ampcode.com/news/amp-free).

> Amp Free is funded by ads from dev and infra companies we all love, including Axiom, Baseten, Buildkite, Chainguard, Graphite, Parallel, PlanetScale, Prisma, Roboflow, Tailwind Labs, Turbo and WorkOS. The ads are targeted based on your codebase, and you can even ask Amp to help you try the advertiser’s product in your codebase or application.

I'm not really a privacy-head, but the part about ads being targeted to your codebase made me double take. I don't think there's really anything *wrong* with it — Amp Free is entirely opt-in, and you can keep paying for the product like before — but something about inviting the equivalent of a Meta Pixel into my terminal has me feeling off.

What *is* really clever, though, is that the CTA for these ads can just be "Try adding authentication" and then the agent goes and does it. It's a perfect way to completely erase the barrier to trying out the advertised service.

Two more observations:

- They're being surprisingly cagey about whose models they're using. They've always been very open about the other models used (mostly Sonnet 4.5, but GPT 5 for the smarter and slower "oracle," and Gemini Flash for summarization and compacting) but in this case they're being completely opaque. Either they don't want to be judged for the cheapness of the models used, or they want the flexibility to switch around a bunch depending on who's willing to cut the price.
- Amp Free requires giving Amp and its model providers permission to retain and train on your code. That makes a complete non-starter for my work, of course, but it also doesn't feel great for my personal projects. The code for my personal projects isn't secret by any means, but it feels like if I can pay a bit to avoid having my code sucked into the all-knowing black hole, maybe I should do that. I can totally see this being great for students or beginners though — and Amp is great, so I'm glad it's more accessible now!
