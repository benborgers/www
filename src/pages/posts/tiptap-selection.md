---
layout: ../../layouts/post.astro
title: How to get current text selection with tiptap
date: 2021-07-08
---

If you’re using the [tiptap](https://tiptap.dev) editor, it can be difficult to figure out how to get the currently selected (highlighted) text.

To do this, you have to drop down to ProseMirror, the library that tiptap is built on top of. You can always access the tiptap editor's ProseMirror instance by taking your tiptap editor instance (`editor`) and accessing `editor.view`.

Using this, we can get the current selection with:

```js
editor.view.state.selection
```

This returns an instance of the `Selection` class, which is [documented here in ProseMirror's documentation](https://prosemirror.net/docs/ref/#state.Selection). You can use all the methods listed in that documentation on `editor.view.state.selection`.

For example, to check whether any text is actually currently highlighted in the tiptap editor, you would do this:

```js
const currentSelectionIsEmpty = editor.view.state.selection.empty
```
