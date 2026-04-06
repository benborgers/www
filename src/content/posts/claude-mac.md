---
title: "Building a DIY OpenClaw"
date: 2026-04-06
draft: true
cover_image: /posts/claude-mac/cover_image.png
---
Two months ago, I bought a Mac Mini and spent the weekend furiously building a small clone of [OpenClaw](https://openclaw.ai/) so I could text with Claude over iMessage.

![claude.png](https://raw.githubusercontent.com/benborgers/www/main/public/posts/claude-mac/claude.png)I've kept updating it since, and I use it every day, for:

- Reminders
- Coding in the background
- Running extensive QA of web apps overnight
- Tracking calories
- Uploading [photos of the day](https://photos.ben.page)
- Recording and untangling ideas via voice messages
- Calendaring
- Getting reminders of where I parked my car (I [shared an AirTag](https://x.com/benborgers/status/2035398754195607603) with Claude)

I wanted to put down some notes on how I built it:

- The Mac Mini has its own Apple ID, so I can iMessage with the email address

- I built a script that runs Claude Code in tmux, and then forwards new iMessages (detected via [`imsg`](https://github.com/steipete/imsg)) into the tmux session

- Claude Code is given a bunch of custom context and instructions saying that the only way to reply is to call a `./send` script, which uses [`imsg`](https://github.com/steipete/imsg) to text me back

- The agent also owns a `CONTEXT.md` file, where it can note down anything it wants to remember about me

- There's a `logbook/` folder, where the agent is instructed to use a script to append short memories about what it does so that some memory is preserved between compactions. The script also appends the link to the full JSON transcript, so the agent can go digging through everything that's been said if it needs to

- I use [`agent-browser`](https://github.com/vercel-labs/agent-browser) to give Claude a browser, which it can use both for web browsing and for verifying its work while it codes

  - I set a persistent `profile`, so login cookies are shared between sessions

- Credentials are kept in 1Password, in a vault that's shared with Claude's API key

- I built lots of skills to bundle up information around performing various tasks:

  - `software-engineering` to note down my preferences for coding projects
  - [`gog`](https://github.com/steipete/gogcli) for Google Calendar/Google Drive
  - `scheduler` for recurring tasks and reminders, via a `launchd` task that runs every minute and then delegates to a script inside the skill that determines whether it should push any instructions into Claude Code's tmux session
  - `war-room` for managing my tasks on [War Room](https://war.elk.sh)
  - `slack-saved` for turning Slack bookmarks (which I would never check back on otherwise) into to-do list tasks
  - `readwise-reader` for recommending articles to read from my 1,000+ unread articles saved in [Readwise Reader](https://readwise.io/read)