---
title: "How to get a Google Sheet as JSON"
date: 2021-08-18
---
Google Sheets can be a great place to store content for a website, since it's structured and easy to update (especially for non-coders).

There's a very useful but obscure way of getting an API for reading a Google Sheet, that doesn't require authentication or complicated permissions. Plus, it updates immediately when the spreadsheet is edited, without delay.

_This post originally included a method that seems to have been removed in August 2021. **The following is a new method that works as of August 2021.**_

---

## New Method

1. Open the Google Sheet and share the spreadsheet (button in the top right corner) so anyone with the link can view it without logging in.
2. Copy the _spreadsheet ID_, which is the long random string in the URL of the spreadsheet. Make sure to copy the entire random part of the URL between two slashes.
3. We’ll be using this URL to get the spreadsheet’s data, replacing `spreadsheet_id` with your spreadsheet ID from the previous step:

```
https://docs.google.com/spreadsheets/d/spreadsheet_id/gviz/tq?tqx=out:json
```

This endpoint doesn’t quite return JSON, but it returns a function call that wraps JSON. Here’s how you can get the data you want using the JavaScript `fetch` API:

```js
const spreadsheetId = '...'
fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2))
    })
```

You’ll notice that I’m chopping off the first 47 characters of the text (which is the beginning of the function call), and then slicing off the last two characters (which is the end of the function call, `);`). `console.log(text)` will show you the full string that the API is returning.

Now, you can inspect the resulting `json` variable to see what the API is returning. Your spreadsheet’s headings will be under `json.table.cols`, and the rows will be under `json.table.rows` in the same order as the columns are returned in `json.table.cols`.

### Reading other sheets in your spreadsheet

You can add `&sheet=Other Sheet Name` to the end of the URL to get data from another sheet/tab.

---

## Old Method (may have stopped working)

1. To start, open the Google Sheet and go to **File → Publish to the web**. Publish the entire document, so that it can be accessed without logging in.
2. Copy and paste the *spreadsheet key*, which is the long random string in the URL of the spreadsheet. Make sure to copy the entire random part of the URL between two slashes.
3. Then, use the URL endpoint below to get the spreadsheet's contents, replacing `spreadsheet_key` with your spreadsheet key from the last step:

```
https://spreadsheets.google.com/feeds/list/spreadsheet_key/1/public/values?alt=json
```

That's it! If you go to that URL in your browser (substituting your spreadsheet key in the URL), you'll see JSON that contains the contents of your spreadsheet.

### Optional step: formatting the data

I always reformat the data from this API before I use it, since I think the way it's returned by default isn't very usable.

Here's some example code I use to format the data, using the `fetch` method in JavaScript ([docs here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)):

```jsx
fetch("https://spreadsheets.google.com/feeds/list/1wQ1TGqnCTmaqqDak1rTRxPMSGSGLMilwrecf7TuqDGc/1/public/values?alt=json")
  .then(res => res.json())
  .then(json => {
    const data = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */

    const rows = json.feed.entry

    for(const row of rows) {
      const formattedRow = {}

      for(const key in row) {
        if(key.startsWith("gsx$")) {

          /* The actual row names from your spreadsheet
           * are formatted like "gsx$title".
           * Therefore, we need to find keys in this object
           * that start with "gsx$", and then strip that
           * out to get the actual row name
           */

          formattedRow[key.replace("gsx$", "")] = row[key].$t

        }
      }

      data.push(formattedRow)
    }

    console.log(data) /* do anything you want with the reformatted data here */
  })
```

The above code will produce a `data` array that looks like this:

```js
[
  {
    image: "1",
    resource: "",
    section: "math",
    test: "1874FPRE",
    firstanswer: "a",
    totalanswers: "5",
    correctanswer: "c"
  },
  {
    image: "2",
    resource: "",
    section: "math",
    test: "1874FPRE",
    firstanswer: "f",
    totalanswers: "5",
    correctanswer: "k"
  },
  ...
]
```

Of course, it's up to you how you parse and use the spreadsheet data for your app.

### Bonus: reading the other sheets in your spreadsheet

In Google Sheets, you can add multiple "sheets", which are like multiple pages. If you'd like to read the contents of the second sheet of your spreadsheet, replace the `1` in the URL with `2` (or whatever number sheet you'd like to read):

```
https://spreadsheets.google.com/feeds/list/spreadsheet_key/2/public/values?alt=json
```
