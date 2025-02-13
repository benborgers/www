---
title: "How /swipes Works"
date: 2022-04-01
---

I have a page of my website at [benborgers.com/swipes](https://benborgers.com/swipes/) that tracks my progress towards [using all 400 of my meal swipes this semester](https://benborgers.com/posts/swipes).

When I [rewrote my website](https://benborgers.com/posts/rewrite) a couple months ago, I tweaked the way that the page works, and I thought it’d be interesting to note down the solution I came up with.

The whole thing is run for free via GitHub, a platform mostly for storing your code.

GitHub also has this thing called GitHub Actions, which allow you to run code on GitHub’s servers. Usually people trigger an Action to run when new code is saved (for example, running tests on the code or deploying the code to the web), but you can also have a GitHub Action run on a schedule.

So I’ve up a GitHub Action that fires off every 15 minutes between 8am and 9pm, which just runs a [Node.js script that I’ve written](https://github.com/benborgers/swipes/blob/71ebd2e961ae3d6bdff7b433cc450e2fec31a1f9/scrape.js). That script fires up a fake Google Chrome browser via a package called _Puppeteer_, and pretends to be me logging into the Tufts JumboCash portal.

Then the script scrapes the number of swipes from the JumboCash portal, and saves it into a publicly available GitHub Gist. GitHub Gists are a way to write down and share short bits of code that aren’t attached to a larger code project. But in this case, I’m using a single Gist to store the latest number of meal swipes I’ve used at all times.

With that, [benborgers.com/swipes](https://benborgers.com/swipes/) can load that publicly available GitHub Gist and read the number of meal swipes I’ve used. I used a [little trick](https://github.com/benborgers/swipes/blob/71ebd2e961ae3d6bdff7b433cc450e2fec31a1f9/src/components/Index.jsx#L10) to get around GitHub caching the data, so the contents of the Gist are always the latest available.

And that’s it! I think it’s a fairly tidy solution: the website I built doesn’t need to run any code on my server, and scraping JumboCash and data storage is all done within GitHub for free.
