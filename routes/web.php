<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;

Route::get('/', [BlogController::class, 'home'])->name('home');
Route::get('/posts', [BlogController::class, 'postsIndex'])->name('posts.index');
Route::get('/posts/{number}', [BlogController::class, 'showPost'])->name('posts.show');
Route::get('/blog/{slug}', fn ($slug) => redirect()->route('posts.show', $slug));

Route::get('/sync', [BlogController::class, 'sync'])->name('sync');

Route::get('/admin', fn () => response()->json(array_reverse(Cache::get('404'))) );
