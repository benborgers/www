---
title: API to read a Notion table
slug: notion-table
date: 2020-04-19
tags:
  - programming
  - notion
draft: false
---
I wrote my own reverse-engineered API for Notion, called Potion. The code is open source on [GitHub](https://github.com/benborgers/potion).

Today, we're going to use that API to read a table in Notion.

# Getting the table ID

To use the API, we need the ID of the table in Notion that we want to read.

First, make the table public using the **Share** button in the top right corner:

![](/assets/notion-public-access.png)

Then, click the **Copy page link** button and paste the link somewhere. The long string of characters in the link (but not after the `?`) is the Notion document ID:

![](/assets/notion-table-id.png)

*The ID in this example is `2364751436224832ba85e279417ea798`.*

You'll need to give this ID to the API in order to tell it which table to read from.

# Using the Potion API

Now, we'll use [Potion](https://potion-api.now.sh) to read the table.

The endpoint we want to send a GET request to is:

```
https://potion-api.now.sh/table?id=NOTION_DOCUMENT_ID
```

You can click [here](https://potion-api.now.sh/table?id=2364751436224832ba85e279417ea798) and see what the response would look like with the example ID we copied earlier, which is the ID for [this table](https://notion.so/2364751436224832ba85e279417ea798).

Here's an example for javascript using `fetch`, which is built in to the browser:

```jsx
fetch("https://potion-api.now.sh/table?id=2364751436224832ba85e279417ea798")
  .then(res => res.json())
  .then(json => {
    console.log(json)
  })
```

From here, you can use the data however you'd like. Feel free to use it to populate a website, read data for running a daily script, etc. This opens up a ton of new possibilities!
