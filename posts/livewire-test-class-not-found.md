---
title: How to solve "Class 'Tests\Feature\Livewire' not found"
slug: livewire-test-class-not-found
date: 2020-08-03
tags:
  - programming
  - laravel
  - livewire
draft: false
---
You're probably writing a Laravel test for a Livewire component.

[The docs](https://laravel-livewire.com/docs/testing) don't seem to mention that you need to import a package at the top of your test file first, like this:

```php
use Livewire\Livewire;
```

Now, you can use `Livewire::test` because it's been imported at the top of the file. 
