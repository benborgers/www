<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;

Route::get('/', [BlogController::class, 'home'])->name('home');
Route::get('/posts', [BlogController::class, 'postsIndex'])->name('posts.index');
Route::get('/posts/{number}', [BlogController::class, 'showPost'])->name('posts.show');
Route::get('/sync', [BlogController::class, 'sync'])->name('sync');
