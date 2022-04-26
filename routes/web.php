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

    return view('posts.index', [
        'posts' => $posts->where('type', 'non_technical')->values(),
        'months' => true
    ]);
})->name('posts.index');

Route::get('/technical-posts', function () {
    $posts = all_posts();

    return view('posts.index', [
        'posts' => $posts->where('type', 'technical')->values(),
        'months' => false
    ]);
})->name('posts.technical-index');

Route::get('/posts/{slug}', function ($slug) {
    $post = all_posts()->firstWhere('slug', $slug);
    abort_if(! $post, 404);
    return view('posts.show', ['post' => $post]);
});
