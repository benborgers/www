---
title: You should be able to run your dev server against your production database
date: 2025-10-13
draft: true
starred: false
unlisted: false
---
I've always loved the ability to run a local web app you're working on, against production infrastructure.

- At [Buttondown](https://buttondown.com), I can pull down the production `.env` file from Heroku and run the Django server against it.
- At [Notion](https://notion.com/product), we had `notion run --env staging` or `notion run --env dev` (counterintuitively, at Notion, *dev* refers not to *local development* but to the internal instance that employees use — [dev.notion.so](https//dev.notion.so)).

Both of these fire up the web app on your local computer, but connect it up to the real live database and other infrastructure.

It's marvelous for debugging — a customer or a colleague runs into something weird in the live app, and you can reproduce exactly what they saw inside of an app that you can manipulate. You can throw log statements in, and verify that your change actually fixes what they ran into.

It's definitely a "sharp knife" of a tool:

- Developers now have access to everyone's data (at least temporarily — maybe there's an approval process that gives you access for a couple hours)
- Developers could inadvertently run something, thinking it's their personal local development environment, but it's actually being run against real data

But when a customer reports a bug in Buttondown: being able to reproduce it instantly, track down the bug in minutes, and validate the fix with confidence feels great.
