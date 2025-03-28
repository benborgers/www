---
title: "Brief: AI-summarized news"
date: 2022-12-04
---

Like a lot of people, I’ve been going down the rabbit hole of playing with the [ChatGPT](https://chat.openai.com) AI recently.

I realized that it’s pretty good at summarizing news articles, so I decided to build a website that shows 10 NYTimes articles and short summaries of them (so that I can read them with my minuscule attention span).

A day or so later, I finished [Brief](https://brief.ben.page), a website that does just that!

![](/posts/brief/image-6.png)

A few notes:

- It uses the [NYTimes Most Popular API](https://developer.nytimes.com/docs/most-popular-product/1/overview), which is surprisingly good and free!
- It scrapes the content from the article via HTML, which is not bad but sometimes doesn’t work very well.
- ChatGPT doesn’t have an API yet, so I’m spinning up a virtual browser using Puppeteer and logging into my OpenAI account pretending to be a user using the demo.
- The Puppeteer runs when the [Astro](https://astro.build) site is _building_ on [Vercel](https://vercel.com), which only happens once an hour, so it’s not that much ChatGPT usage.
- To get Puppeteer working on the Vercel builders, I had to add a few arguments that are apparently 🚨 _not safe_ 🚨 but oh well:

```javascript
const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
```

---

_Update: OpenAI quickly got smart and put bot detection in front of ChatGPT, so this stopped working. I had it coming for me._ [_The site_](https://brief.ben.page) _is frozen in time to when it stopped working._
