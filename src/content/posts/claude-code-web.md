---
title: I’ve been loving Claude Code on the Web
date: 2025-10-25
draft: false
starred: false
unlisted: false
---
This week, I've been voraciously using [Claude Code on the web](https://www.anthropic.com/news/claude-code-on-the-web).

![](/posts/claude-code-web/2025-10-25%20at%2008.47.03@2x.png)

It's very much a "v1" product. You type a prompt to start a new thread, it launches a little container for your agent to work in, and you can keep talking to it. It produces a branch, which you can open a PR for (that's the only way to see a diff of the changes Claude Code made, for now). Or if you want to keep working locally, you can copy a `claude --teleport <uuid>` command that brings the branch down onto your computer and continues the same thread with Claude Code locally.

Something about this early product is really great. I've been using it as a "to-do list that does itself" — when I think of something small that I want to tweak, across a variety of projects (work, work-related side project, side project, open source project) I just throw it into a thread. Then I come back, sometimes later in the day and sometimes days later, to see what Claude did and to finish things up.

It's also available in the Claude iOS app, which has been great. When I'm walking and have a thought for something I want to know more about (for example, "What screens could be impacted by this change that I should test more thoroughly?"), I can just ask and know that the answer will be there for me when I come back.

[Cursor built this same thing 4 months ago](https://cursor.com/blog/agent-web). I've tried their version a few times since, and I've never liked this much. Why?

I had trouble nailing down an answer, but I think the answer is actually just *product quality*. Cursor's implementation is a bit finicky, loading states a bit jumpy, and things feel fragile. The font's too small too, in my opinion.

Claude Code on the web feels very solid and dependable. And for some reason, that's made the difference for me this week.
