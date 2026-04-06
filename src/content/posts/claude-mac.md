---
title: "Building a DIY OpenClaw"
date: 2026-04-06
draft: true
---
Two months ago, I bought a Mac Mini, and I spent the weekend furiously building a small clone of [OpenClaw](https://openclaw.ai/) so I could text with Claude over iMessage.

![claude.png](https://raw.githubusercontent.com/benborgers/www/main/public/posts/claude-mac/claude.png)I use it every day, for:

- Reminders
- Coding remotely and in the background
- Running extensive QA overnight
- Tracking calories
- Uploading [photos of the day](https://photos.ben.page)
- Recording and untangling ideas via voice messages
- Calendaring
- Getting reminders of where I parked my car (I [shared an AirTag](https://x.com/benborgers/status/2035398754195607603) in my car with Claude)

I wanted to put down some notes on how I built it:

- The Mac Mini has its own Apple ID, so I can iMessage with the email address
- I built a script that runs `claude` in tmux, and then forwards new iMessages (detected via `imsg`) into the tmux session
- Claude has a bunch of custom context and instructions saying that the only way to reply is to call a `./send` script, which uses `imsg` to text me back
- I use `agent-browser` to give Claude a browser, which it can use both for web browsing and for verifying its work while it codes
  - I set a persistent `profile`, so login cookies are shared between sessions
- Credentials are kept in 1Password, in a vault that's shared with Claude's API key
- For everything, I built skills:
  - `software-engineering` to note down my preferences for coding projects
  - `gog` for Google Calendar/Google Drive
  - `scheduler` for recurring tasks and reminders, via a `launchd` task that runs every minute and then delegates to a script inside the skill that determines whether it should launch anything into Claude Code's tmux session
  - `war-room` for managing my tasks on [War Room](https://war.elk.sh)
  - `slack-saved` for turning Slack bookmarks (which I would never check back on otherwise) into to-do list tasks
  - `readwise-reader` for recommending articles to read from my 1,000+ unread articles saved in [Readwise Reader](https://readwise.io/read)