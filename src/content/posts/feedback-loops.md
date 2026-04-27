---
title: "Give your agent feedback loops"
date: 2026-04-27
draft: true
---
Right now, the most incredible thing you can do with coding agents (Claude Code, Codex, Amp, etc) is to give them a feedback loop.

Examples — have the agent:

- Write an API endpoint, test it with `curl`, and inspect the database's new state
- Build an invokable script or CLI for a small piece of functionality and use it to test and iterate
- Use [`agent-browser`](https://github.com/vercel-labs/agent-browser) or Codex's [Computer Use](https://developers.openai.com/codex/app/computer-use) to literally test out the app by pointing and clicking

Agents are good in a single blind one-shot generation, but not *that* good. They'll make mistakes. 

If you don't add a feedback loop, *you're* the feedback loop. You become QA, and telling the agent that it something still doesn't work is extremely frustrating. 

Take yourself out of the loop. After all, the way we (used to?) program is to "write a little, test a little." So give your agent the power to iterate and correct its own mistakes before it comes back to you. 