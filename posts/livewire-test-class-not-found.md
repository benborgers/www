---
title: How to solve "Class 'Tests\Feature\Livewire' not found"
date: 2020-08-03
tags:
    - programming
    - laravel
    - livewire
---
This probably means that you're writing a Laravel test for a Livewire component.

For some reason, [the docs](https://laravel-livewire.com/docs/testing) don't mention that you need to import a package at the top of your test file first:

```php
use Livewire\Livewire;
```

Now, you can use all the `Livewire::test` goodness.
