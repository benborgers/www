<?php

use Illuminate\Support\Facades\Route;
use App\Models\Blob;

Route::get('/', function () {
    return view('index', [
        'content' => Blob::firstWhere('name', 'index')->data['content']
    ]);
})->name('index');

Route::get('/posts', function () {
    $posts = all_posts();

    return view('posts.index', ['posts' => $posts]);
})->name('posts.index');
