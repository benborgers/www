<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/redirects.php';

Route::get('/', function () {
    return view('index', [
        'content' => github_issues()->firstWhere('title', 'benborgers.com')['html']
    ]);
})->name('index');

Route::get('posts', function () {
    if (request()->has('technical')) {
        return redirect()->route('posts.technicalIndex');
    }

    $allPosts = all_posts();
    $posts = $allPosts->where('technical', false)->values();

    $today = today('America/New_York');
    $currentDate = clone $today;
    $streak = 0;

    while (true) {
        if (
            $posts->first(fn ($post) => $post['date']->isSameDay($currentDate))
        ) {
            $streak++;
        } else {
            if(! $currentDate->isSameDay($today)) {
                break;
            }
        }

        $currentDate->subDay();
    }

    return view('posts.index', [
        'posts' => $posts,
        'months' => true,
        'streak' => $streak,
        'technicalPostsCount' => $allPosts->where('technical', true)->count()
    ]);
})->name('posts.index');

Route::get('technical-posts', function () {
    $posts = all_posts()->where('technical', true)->values();

    return view('posts.index', [
        'posts' => $posts,
        'months' => false
    ]);
})->name('posts.technicalIndex');

Route::get('posts/{slug}', function ($slug) {
    $post = all_posts()->firstWhere('slug', $slug);
    abort_if(! $post, 404);
    return view('posts.show', ['post' => $post]);
})->name('posts.show');

// Route::get('/s/{slug}', function ($slug) {
//     $page = SofaPage::firstWhere('slug', $slug);
//     abort_if(! $page, 404);
//     return view('sofa-page', ['page' => $page]);
// });

Route::get('og-image', function () {
    return view('og-image', [
        'title' => request('title')
    ]);
})->name('ogImage');
