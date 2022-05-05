<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

Route::post('clear-github-issues-cache', function () {
    Cache::forget('github_issues');
    github_issues();
});
