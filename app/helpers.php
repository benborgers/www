<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

function data_file($path)
{
    $path = resource_path('data/' . $path . '.json');
    $contents = file_get_contents($path);
    return json_decode($contents);
}

function fill_posts_cache()
{
    $request = Http::withToken(env('GITHUB_TOKEN'))
        ->get('https://api.github.com/repos/benborgers/HQ/issues?labels=www');

    $data = $request->json();

    Cache::forever('posts', $data);

    return $data;
}

function get_posts()
{
    if($cached = Cache::get('posts')) return $cached;
    return fill_posts_cache();
}

function fill_post_cache($number)
{
    $request = Http::withToken(env('GITHUB_TOKEN'))
        ->withHeaders(['accept' => 'application/vnd.github.VERSION.html+json'])
        ->get('https://api.github.com/repos/benborgers/HQ/issues/' . $number);

    $data = $request->json();

    $forWebsite = collect($data['labels'] ?? [])
        ->map(fn ($label) => $label['name'])
        ->contains('www');
    if(! $forWebsite) return abort(404);

    Cache::forever('post-' . $number, $data);

    return $data;
}

function get_post($number)
{
    if($cached = Cache::get('post-' . $number)) return $cached;
    return fill_post_cache($number);
}

function format_date($date, $format = 'F d, Y')
{
    return Carbon::parse($date)->setTimezone('America/New_York')->format($format);
}
