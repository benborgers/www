<?php

use Illuminate\Support\Facades\Route;
use App\Models\Blob;

Route::get('/', function () {
    return view('index', [
        'content' => Blob::firstWhere('name', 'index')->data['content']
    ]);
});
