<?php

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Spatie\ShikiPhp\Shiki;

function all_posts() {
    // TODO: remove
    // Cache::forget('posts');
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
                $post['type'] = 'technical';

                return $post;
            });

        $ghostData = json_decode(file_get_contents(resource_path('ghost.json')))->db[0]->data;
        $ghostPosts = collect($ghostData->posts)
            ->filter(fn ($post) => $post->type === 'post' && $post->status === 'published')
            ->map(function ($post) use ($ghostData) {
                $html = str($post->html)
                    ->replaceMatches('/<pre><code(?: class="language-(.*?)")?>(.*?)<\/code><\/pre>/s', function ($matches) {
                        return Shiki::highlight(
                            code: htmlspecialchars_decode($matches[2]),
                            language: $matches[1] === '' ? 'plaintext' : $matches[1],
                            theme: config('markdown.code_highlighting.theme')
                        );
                    });

                return [
                    'title' => $post->title,
                    'date' => Carbon::parse($post->published_at)->timezone('America/New_York'),
                    'slug' => $post->slug,
                    'html' => $html->toString(),
                    'type' => collect($ghostData->posts_tags)
                        ->firstWhere('post_id', $post->id)
                        ?->tag_id === '6201374c0476c71d38b9a1e4' // Ghost ID for '#technical' tag
                        ? 'technical' : 'non_technical'
                ];
            });

        return $localTechnicalPosts->concat($ghostPosts)->sortByDesc('date')->values();
    });
}