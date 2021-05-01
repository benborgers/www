---
title: How to solve "Class 'Tests\Feature\Livewire' not found"
date: 2021-01-24
---

If you get this error, you're probably writing a Laravel test for a Livewire component.

[The docs](https://laravel-livewire.com/docs/testing) don't seem to mention that you need to import a package at the top of your test file first, like this:

```php
use Livewire\Livewire;
```

Now that you have this package imported, you can use `Livewire::test` in your tests.
