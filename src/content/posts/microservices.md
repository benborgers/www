---
title: "Does coding with LLMs mean more microservices?"
date: 2026-04-05
draft: true
cover_image: /posts/microservices/cover_image.png
---
Recently, at work, I've seen the beginnings of a proliferation of microservices. **It seems that LLM-assisted coding naturally flows towards small microservices, which the big backend uses for specific tasks.** For example, a microservice that handles image and video generation AI models. 

A microservice has a very well-defined surface area. Everything that flows into the service (requests) and out (responses, webhooks) is controlled. That means that you can let an LLM rip large-scale refactors inside of the service, and as long as the contract with the outside world remains the same, the inside does not matter. The microservice might have its own database, caches, and object storage, but the caller does not care. 

When coding in a monolith, you have to worry about implicit coupling. The order in which you do things, or the name of a cache key, might be implicitly relied-upon by another part of the monolith. It's a lot easier to cross boundaries and couple parts of the application. Of course, *you* might not do such unmaintainable things, but your coworkers (or yourself following a deadline) might not be so pious. 

A microservice has much less risk of coupling. Let Claude do whatever it wants, and the outside world doesn't care as long as it keeps working. 

From an organizational perspective, there's additional reasons why a microservice can be the path of least resistance: 

1. Being in a separate GitHub repo, there's less scrutiny on PR review (or using PRs at all), meaning you can iterate faster
2. The production data and infrastructure can be much easier to access — often the main production database is locked down and hard for everyday engineers to connect to in order to debug

A proliferation of microservices is probably worse and harder to maintain in the long term. When you have dozens of apps, all with their own billing accounts, hosting setups, and resources, it's a lot easier to forget to renew that OpenAI API account that only your image-generation microservice hosted on Vercel uses. 

But these microservices are where the path of least resistance flows. If you want better practices, you have to make it *easier* for people to achieve their desired outcomes while following your desired practices. 