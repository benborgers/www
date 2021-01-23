<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

function data_file($path)
{
    $path = resource_path('data/' . $path . '.json');
    $contents = file_get_contents($path);
    return json_decode($contents);
}

function fill_posts_cache()
{
    $request = Http::withToken(env('GITHUB_TOKEN'))
        ->withHeaders(['accept' => 'application/vnd.github.VERSION.html+json'])
        ->get('https://api.github.com/repos/benborgers/HQ/issues?labels=www');

    $data = $request->json();

    Cache::forever('posts', $data);

    return $data;
}

function get_posts()
{
    if(Cache::has('posts')) return Cache::get('posts');
    return fill_posts_cache();
}
