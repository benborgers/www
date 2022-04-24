<?php

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

function all_posts() {
    // TODO: remove
    Cache::forget('posts');
    return Cache::rememberForever('posts', function () {
        $localTechnicalPosts = collect(scandir(resource_path('posts')))
            ->filter(fn ($slug) => ! str($slug)->startsWith('.'))
            ->map(function ($slug) {
                $post = [];

                $contents = str(file_get_contents(resource_path("posts/$slug")));
                [, $rawFrontmatter, $markdown] = $contents->split('/---/');
                str($rawFrontmatter)
                    ->split('/\n/')
                    ->filter(fn ($line) => str($line)->trim()->isNotEmpty())
                    ->each(function ($line) use (&$post) {
                        $key = str($line)->before(':')->trim()->toString();
                        $value = str($line)
                            ->after(':')
                            ->trim()
                            ->replaceMatches('/^"|"$/', '')
                            ->toString();
                        if ($key === 'date') {
                            $value = Carbon::parse($value);
                        }
                        $post[$key] = $value;
                    });

                $post['markdown'] = str($markdown)->trim()->toString();
                $post['slug'] = str($slug)->replaceMatches('/\.md$/', '')->toString();

                return $post;
            });

        $ghostPosts = collect(
            json_decode(file_get_contents(resource_path('ghost.json')))->db[0]->data->posts
        )
            ->filter(fn ($post) => $post->type === 'post' && $post->status === 'published')
            ->map(function ($post) {
                return [
                    'title' => $post->title,
                    'date' => Carbon::parse($post->published_at),
                    'slug' => $post->slug,
                    'html' => $post->html
                ];
            });

        return $localTechnicalPosts->concat($ghostPosts)->sortByDesc('date')->values();
    });
}
