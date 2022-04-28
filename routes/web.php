<?php

use Illuminate\Support\Facades\Route;
use App\Models\Blob;

require __DIR__.'/redirects.php';

Route::get('/', function () {
    return view('index', [
        'content' => Blob::firstWhere('name', 'index')->data['content']
    ]);
})->name('index');

Route::get('/posts', function () {
    $posts = all_posts()->where('technical', false)->values();

    $today = today('America/New_York');
    $currentDate = $today;
    $streak = 0;

    while (true) {
        if (
            $posts->first(fn ($post) => $post['date']->isSameDay($currentDate))
        ) {
            $streak++;
            $currentDate->subDay();
        } else {
            break;
        }
    }

    return view('posts.index', [
        'posts' => $posts,
        'months' => true,
        'streak' => $streak
    ]);
})->name('posts.index');

Route::get('/technical-posts', function () {
    $posts = all_posts()->where('technical', true)->values();

    return view('posts.index', [
        'posts' => $posts,
        'months' => false
    ]);
})->name('posts.technical-index');

Route::get('/posts/{slug}', function ($slug) {
    $post = all_posts()->firstWhere('slug', $slug);
    abort_if(! $post, 404);
    return view('posts.show', ['post' => $post]);
})->name('posts.show');
