---
title: "How to dispatch a job locally from Laravel Tinker"
date: 2021-01-27
---
When developing a Laravel app locally, the `::dispatch()` method might not work from Laravel Tinker, since a real queue driver isn't running. 

Instead, after starting Tinker (`php artisan tinker`), try this command: 

```bash
\Bus::dispatch(new App\Jobs\SomeJob($arguments))
```