<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Spatie\ShikiPhp\Shiki;

function github_issues()
{
    return Cache::rememberForever('github_issues', function () {
        return Http::withToken(env('GITHUB_TOKEN'))
            ->withHeaders(['accept' => 'application/vnd.github.VERSION.full+json'])
            ->get('https://api.github.com/repos/benborgers/HQ/issues?state=open&per_page=100')
            ->collect()
            ->map(function ($issue) {
                $frontmatterLines = str($issue['body'])->startsWith('```')
                    ? str($issue['body'])->after('```')->before('```')->trim()->split('/\r\n/')
                    : collect();
                $frontmatter = [];
                $frontmatterLines->each(function ($line) use (&$frontmatter) {
                    $key = str($line)->before(':')->trim()->toString();
                    $value = str($line)->after(':')->trim()->toString();

                    if ($key === 'date') {
                        $value = Carbon::parse($value);
                    }

                    $frontmatter[$key] = $value;
                });

                return [
                    ...$frontmatter,
                    'title' => $issue['title'],
                    'html' => str($issue['body_html'])
                                ->after('</div>') // Removes opening frontmatter code block.
                                ->replaceMatches(
                                    // Regex: m = multiline, s = spaces match newlines too.
                                    '/<details.*?<video src="(.*?)".*?<\/details>/ms',
                                    '<video src="$1" controls></video>'
                                )
                                ->toString(),
                    'labels' => collect($issue['labels'])->map(fn ($label) => $label['name'])
                ];
            });
    });
}

function all_posts() {
    // static_posts stores posts that aren’t gonna change much:
    // locally stored markdown posts and exporeted data from Ghost.
    $staticPosts = Cache::rememberForever('static_posts', function () {
        $localTechnicalPosts = collect(scandir(resource_path('posts')))
            ->filter(fn ($slug) => ! str($slug)->startsWith('.'))
            ->map(function ($slug) {
                $post = [];

                $contents = str(file_get_contents(resource_path("posts/$slug")));
                $rawFrontmatter = $contents->replaceFirst('---', '')->before('---');
                $markdown = $contents->replaceFirst('---', '')->after('---');
                str($rawFrontmatter)
                    ->split('/\n/')
                    ->filter(fn ($line) => str($line)->trim()->isNotEmpty())
                    ->each(function ($line) use (&$post) {
                        $key = str($line)->before(':')->trim()->toString();
                        $value = str($line)
                            ->after(':')
                            ->trim()
                            ->replaceMatches('/^"|"$/', '')
                            ->replaceMatches('/\\\"/', '"')
                            ->toString();
                        if ($key === 'date') {
                            $value = Carbon::parse($value);
                        }
                        $post[$key] = $value;
                    });

                $post['markdown'] = str($markdown)->trim()->toString();
                $post['slug'] = str($slug)->replaceMatches('/\.md$/', '')->toString();
                $post['technical'] = true;

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
                    })
                    ->replaceMatches('/__GHOST_URL__\/content\/images/', '/img/ghost')
                    ->replaceMatches('/__GHOST_URL__/', '/posts');

                return [
                    'title' => $post->title,
                    'date' => Carbon::parse($post->published_at)->timezone('America/New_York'),
                    'slug' => $post->slug,
                    'html' => $html->toString(),
                    'technical' => collect($ghostData->posts_tags)
                        ->where('post_id', $post->id)
                        ->where('tag_id', '6201374c0476c71d38b9a1e4') // Ghost ID for '#technical' tag
                        ->isNotEmpty()
                ];
            });

        return $localTechnicalPosts->concat($ghostPosts);
    });

    return $staticPosts
        ->concat(
            github_issues()
                ->filter(fn ($issue) => $issue['labels']->contains('Blog') && $issue['labels']->doesntContain('Draft'))
                ->map(function ($issue) {
                    return [
                        ...$issue,
                        'technical' => $issue['labels']->contains('Technical')
                    ];
                })
        )
        ->sortByDesc('date')
        ->values();
}
