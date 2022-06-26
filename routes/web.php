<?php

use Illuminate\Support\Facades\Route;
use App\Http\Livewire;
use App\Models\Subscriber;

require __DIR__.'/redirects.php';

Route::feeds();

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
        'streak' => $streak
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

Route::get('/+/{slug}', function ($slug) {
    $page = github_issues()
        ->filter(fn ($issue) => $issue['labels']->contains('Pages') && $issue['labels']->doesntContain('Draft'))
        ->where('slug', $slug)
        ->first();

    abort_if(! $page, 404);
    return view('page', ['page' => $page]);
})->where('slug', '.*');

Route::get('unsubscribe', Livewire\Unsubscribe::class);

Route::get('subscribers', function () {
    return response(
        Subscriber::latest()->pluck('email')->join("\n")
    )->header('content-type', 'text/plain');
})->name('subscribers')->middleware('signed');

Route::get('og-image', function () {
    return view('og-image', [
        'title' => request('title')
    ]);
})->name('ogImage');
