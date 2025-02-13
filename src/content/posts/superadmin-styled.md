---
title: "New in Superadmin: styling, images, rich text"
date: 2022-11-23
---

For the past few days I’ve been churning out new features on Superadmin, a CMS I built for my own projects and websites I make for people.

It started with styling the entire interface — I built it September, but haven’t had the inspiration to style it nicely until now. Here’s the visual style I landed on:

![](/posts/superadmin-styled/image.png)

Then, I added one-off _pages_ and an _image_ field.

Before, I had “collections” of items — like blog posts or portfolio pieces. But I wanted to have the concept of a _page_, which is a place to update one-off information like “about page bio”.

Also, I added a field that allows people to upload images.

![](/posts/superadmin-styled/image-1.png)

Lastly, I decided that [Editor.js](https://editorjs.io) didn’t feel great and replaced it with [Tiptap](https://tiptap.dev). Using Tiptap is always a bit of a pain because you have to build the editing UI yourself, but I managed to put together a fairly nice editor:

![](/posts/superadmin-styled/image-2.png)

![](/posts/superadmin-styled/image-3.png)
