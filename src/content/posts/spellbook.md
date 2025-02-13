---
title: Prototyping an AI-powered note-taking app
date: 2023-05-18
---

Greetings from Croatia!

![](/posts/spellbook/me_in_croatia.jpeg)

I’m on vacation here with my parents. But in the airport, in the car, and in the evenings, I’ve been tinkering with building a note-taking app.

The idea was for a note-taking app where you can ask an AI assistant questions based on your notes:

<video src="/posts/spellbook/spellbook.mp4" controls playsinline></video>

## How I built it

- [Laravel](https://laravel.com), [React](https://react.dev) (via [Inertia](https://inertiajs.com))
- A background job periodically extracts new paragraphs from your notes and “embeds” them using OpenAI’s [embeddings](https://platform.openai.com/docs/guides/embeddings).
  - How do embeddings work? (Based on Ben’s very basic understanding) An embedding takes a piece of text and outputs a _vector_, an array of 1,536 numbers that identifies a point in 1,536-dimensional space (just like 3 numbers identify a point in 3D space).Then you can take any two pieces of text that’ve been “embedded” into a vector and calculate how far apart they are (like you could for two points in 3D).That distance between the two points is how closely related they are —&nbsp;for example, a sentence about “cats” and “pets” would be more closely related than a sentence about “cats” and “mountains”.
- When you ask a question, the app embeds your question and finds the most relevant paragraphs in your notes.
- It feeds these paragraphs into ChatGPT’s API, along with your question, and the AI synthesizes an answer.

## meh

I don’t think I’m gonna keep building this.

### feature parity

Note-taking apps are a fickle thing to build, and despite this I [keep](/stickies) [trying](https://github.com/benborgers/brain) [to](https://github.com/benborgers/brain2) build them. But there’s a _ton_ of features that a note-taking app eventually needs to have to be in line with the myriad of note-taking apps out there.

If I’m going to ask people (starting with myself) to use this app, it needs those features. And I’m the one who’s going to have to build them all, and make them nice.

### is this useful?

After thinking about it, I’m not convinced that “ChatGPT for your notes” is a useful concept.

Every use-case I can come up with can be solved by really good search, powered by vector embeddings. But feeding the search results into AI and having it synthesize an answer doesn’t seem to add any value, and costs speed and money for each question.

(If you have ideas of common situations where it **_would_** be useful, please let me know!)

And at the end of the day, good search is a _feature_, not a product. I’m sure Notion and all the others are looking into using embeddings to power their search. I look forward to when that happens.
