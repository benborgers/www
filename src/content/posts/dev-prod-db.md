---
title: You should be able to run your dev server against your production database
date: 2025-10-13
draft: false
starred: false
unlisted: false
---
I've always loved the ability to run a local web app you're developing against production infrastructure.

- At [Buttondown](https://buttondown.com), I can pull down the production `.env` file from Heroku and run the Django server using those variables.
- At [Notion](https://notion.com/product), we had `notion run --env staging` or `notion run --env dev` (counterintuitively, at Notion, *dev* refers not to *local development* but to the internal instance of Notion that employees use — [dev.notion.so](https//dev.notion.so)).

Both of these fire up the web app on your local computer, but connect it up to the real live database and other infrastructure.

It's marvelous for debugging — a customer or a colleague runs into something weird in the live app, and you can reproduce exactly what they saw. Then, you can manipulate the code — you can throw log statements in, find the bug, and then verify that your change actually fixes what they ran into in the exact situation they ran into it.

It's definitely a "sharp knife" of a tool:

- Developers now have access to everyone's data (at least temporarily — maybe there's an approval process that gives you access for a couple hours)
- Developers could inadvertently run some code, mistakenly thinking it's their personal local development environment, but in reality it's being run against real data

Hard problems to solve. But when a customer reports a bug in Buttondown: being able to reproduce it instantly, track down the bug in minutes, and validate that it all works, feels so great.
