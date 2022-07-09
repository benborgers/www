<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::post('clear-github-issues-cache', function () {
    Cache::forget('github_issues');
    github_issues();
});
