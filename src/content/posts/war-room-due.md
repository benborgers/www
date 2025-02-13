---
title: "War Room —\_using the native date picker"
date: 2023-02-13
---

A couple months ago, I finally added the ability to set due dates for tasks in [War Room](https://war.elk.sh).

I built my own modal with a calendar-style date picker when I did that, but recently I decided to replace it with a nicer implementation that felt more lightweight. I decided to rely on the native browser date picker for the new version — why build a date picker when you can use a nice one that’s built-in already?

I ended up building this tiny pop-up that’s pinned right below the button, which allows you to set a due date for a task:

<video src="/posts/war-room-due/due_1.mp4" controls playsinline></video>

I asked [Christian](https://cbernier.com/) to test it out and he usefully bashed it around and pointed out that setting a due date for a task at the bottom of the screen meant that the pop-up was cut off, so I had to flip it if the task is within the bottom 150 pixels of the screen:

<video src="/posts/war-room-due/due_2.mp4" controls playsinline></video>

In reality the pop-up is implemented as a [Modal](https://headlessui.com/react/dialog), so the rest of the screen can’t be scrolled or interacted with while it’s open. When the “due”&nbsp;button is clicked, I measure where the button is on the screen, and position the modal right below (or above) it so that it appears to be “pinned”&nbsp;by the button.
