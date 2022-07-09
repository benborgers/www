<?php

use Illuminate\Support\Facades\Route;

foreach (json_decode(file_get_contents(resource_path('redirects.json'))) as $from => $to) {
    Route::redirect($from, $to);
}

Route::get('/blog/{slug}', fn ($slug) => redirect()->route('posts.show', $slug));
