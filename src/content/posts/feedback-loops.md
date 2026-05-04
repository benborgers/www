---
title: "Without feedback loops, you’re the feedback loop"
date: 2026-04-27
draft: false
cover_image: /posts/feedback-loops/cover_image.png
---
When coding with agents, if you don't add a feedback loop, *you're* the feedback loop. You become QA, and telling the agent that something still doesn't work is extremely frustrating. 

So take yourself out of the loop. After all, the way we (used to?) program is to "write a little, test a little." Give your agent the power to iterate and correct its own mistakes before it comes back to you.

For example, have the agent:

- Write an API endpoint, test it with `curl`, and inspect the database's new state
- Build an invokable script or CLI for a small piece of functionality and use it to test and iterate
- Use [`agent-browser`](https://github.com/vercel-labs/agent-browser) or Codex's [Computer Use](https://developers.openai.com/codex/app/computer-use) to literally test out the app by pointing and clicking

Agents are good in a single blind one-shot generation, but not *that* good. They'll make mistakes — just like you would. The only difference is that *you* can test your work with frequent feedback loops. Your agent should be able to do that too, if only you provide the right direction. 