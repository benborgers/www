---
title: "Give your agent feedback loops"
draft: true
---
Right now, the most incredible thing you can do with coding agents (Claude Code, Codex, Amp, etc) is to give them a feedback loop.

Examples:

- Write an API endpoint, test it with `curl`, inspect the database's new state
- Build an invokable script or CLI for a small piece of functionality and let the agent invoke it
- Use [`agent-browser`](https://github.com/vercel-labs/agent-browser) or Codex's [Computer Use](https://developers.openai.com/codex/app/computer-use) to literally test out the app by pointing and clicking

Agents are good in one-shot, but not *that* good. They'll make mistakes. 

If you don't add a feedback loop, *you're* the feedback loop. You become QA, and telling the agent that it didn't work is extremely frustrating. Take yourself out of the loop; make it more likely that when the agent comes back, it's confident that the results are right. 