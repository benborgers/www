---
layout: ../../layouts/post.astro
title: "How to kill a localhost process on macOS"
date: 2021-01-23
---
Sometimes you've got a development server running on a localhost port in the background that you can't seem to stop.

For example, if the port is `localhost:8000`, run:

```bash
sudo lsof -i :8000
```

You should see the processes running on that port. Take note of the `PID` for these processes.

Then, run:

```bash
kill -9 <PID>
```