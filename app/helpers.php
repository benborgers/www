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
    $posts = [];

    for($i = 1; $i < 100; $i++) {
        $request = Http::withToken(env('GITHUB_TOKEN'))
            ->get('https://api.github.com/repos/benborgers/HQ/issues?labels=www&per_page=100&page=' . $i);

        $json = $request->json();
        $posts = array_merge($posts, $json);

        if(count($json) === 0) break;
    }

    $chunks = collect($posts)
        ->sortByDesc('updated_at')
        ->chunk(25)
        ->map(function ($chunk, $i) {
            Cache::forever('posts-' . $i + 1, $chunk);
        });

    return $posts;
}

function get_posts($page = null)
{
    if(isset($page)) {
        return Cache::get('posts-' . $page) ?? collect([]);
    }

    $posts = collect([]);

    for($i = 1; $i < 10; $i ++) {
        $chunk = Cache::get('posts-' . $i);
        if($chunk) {
            $posts = $posts->merge($chunk);
        } else {
            break;
        }
    }

    return $posts;
}

function fill_post_cache($number)
{
    $request = Http::withToken(env('GITHUB_TOKEN'))
        ->withHeaders(['accept' => 'application/vnd.github.VERSION.full+json'])
        ->get('https://api.github.com/repos/benborgers/HQ/issues/' . $number);

    $data = $request->json();

    $forWebsite = collect($data['labels'] ?? [])
        ->map(fn ($label) => $label['name'])
        ->contains('www');

    if($forWebsite) {
        Cache::forever('post-' . $number, $data);
    }
}

function get_post($number)
{
    return Cache::get('post-' . $number) ?? abort(404);
}

function format_date($date, $format = 'F d, Y')
{
    return Carbon::parse($date)->setTimezone('America/New_York')->format($format);
}
