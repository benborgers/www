---
title: "Amp is the best thing since sliced bread, right now"
date: 2026-11-07
cover_image: ./images/amp/cover.png
---
[Amp](https://ampcode.com/) has a new(ish) concept called [orbs](https://ampcode.com/notes/orbs-explained):

- Each thread with their coding agent lives inside a virtual machine
- That machine can run your entire codebase
- Those machines don't stop running when you close your computer
- You can view dev servers running inside that machine, or it can send you screenshots/videos

They're *much* better than anything else on the market, and it's baffling to me that Codex and Claude Code haven't made anything to compete.

I've completely stopped using local development, both for work and for personal projects. I can spin up an infinite number of environments, one for each feature or idea. Agents can run for hours, without me worrying that they'll stop if I close my laptop or that they'll collide with each other.

And agents do *so* much better when they can test their own work. Locally, that means a complicated git worktree setup and overlapping resources. (Our work monorepo is heavy enough that you really *can't* run more than one instance of the stack on your laptop.) In Amp, there's nothing to think about. You just ask for a video showing a newly-built feature being tested end-to-end, and you get one back after some time.

Amp has completely transformed how I build. Everything I do is in Amp. I don't remember the last time I loved a tool this much.
