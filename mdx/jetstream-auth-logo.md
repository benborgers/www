---
title: Customizing the logo on Laravel Jetstream’s authentication pages
date: 2020-03-08
---

Laravel Jetstream puts a default logo at the top of the login, register, and password reset pages.

You'll probably want to change this logo, and luckily Jetstream gives you an easy way to change it.

First, publish Jetstream's views using this command if you haven't already:

```bash
php artisan vendor:publish --tag=jetstream-views
```

If you're using the Livewire stack, put your logo in the component at `resources/views/vendor/jetstream/components/authentication-card-logo.blade.php`. If you're using the Inertia stack, this component is at `resources/js/Jetstream/AuthenticationCardLogo.vue`.

All of Jetstream's authentication pages use this component to show the logo, so updating this one component updates all those pages (login, register, etc).

If you don't want any logo, you can even make this component an empty file as an easy solution to remove the logo from every auth-related page.
