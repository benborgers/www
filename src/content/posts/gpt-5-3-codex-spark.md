---
title: "An underbaked GPT-Codex-5.3-Spark review"
date: 2026-02-14
draft: true
---
Two days ago, OpenAI released [GPT-5.3-Codex-Spark](https://openai.com/index/introducing-gpt-5-3-codex-spark/). I begrudgingly subscribed to ChatGPT Pro to try it, and now that I've used it for two days, I have a comprehensive understanding of the model and am ready to pass judgement.

The speed of the model is *incredible*. Watching tokens fly by at breakneck speed, especially when it's purely outputting tokens (as opposed to searching or using subagents, which doesn't show up in the UI), is magical.

It's also the first time I've seriously used the [Codex Mac app](https://openai.com/codex) or their CLI, both of which are on-par with what's expected these days (and the Mac app has a nice way of seeing diffs, both from the current turn and the whole branch diff against `main`).

However, my experience with `gpt-5.3-codex-spark` is that it's *noticeably* dumber. I was initially very impressed with a couple tasks, in which it got the answer correct and very fast. But this graph very quickly felt true:

![SWE-Bench Pro.png](https://raw.githubusercontent.com/benborgers/www/main/public/posts/gpt-5.3-codex-spark/SWE-Bench%20Pro.png)It shows that, even the `extra-high` version of `spark` is on-par with the `low` version of `gpt-5.3-codex`. And I don't really care about benchmarks, but there were investigations that `gpt-5.3-codex` and `opus-4.6` could do (albeit slower) while `gpt-5.3-codex-spark` just found a plausible-but-incorrect answer.

The model feels a bit like a hyperactive child. It can go extremely quickly, bash into a bunch of walls, isn't great at listening to instructions, and is wrong a bit more than the slow, adult models.

Maybe back when Cursor released [Composer](https://cursor.com/blog/composer) (which they recently [improved](https://cursor.com/blog/composerhttps://cursor.com/blog/composer-1-5)), I would have said that there's a place for fast-but-slightly-dumber models. But I don't think I believe that anymore.

The frontier models (Opus 4.6 and GPT-5.3-Codex) are *so* good, that they cut out significant frustration. And especially in a world where you can [pay through the nose](https://code.claude.com/docs/en/fast-mode) for faster Opus 4.6, it doesn't feel like a worthwhile tradeoff to go down a level in intelligence when you could just wait a bit longer for a response but save time in back-and-forths with a