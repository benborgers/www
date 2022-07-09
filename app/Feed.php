<?php

namespace App;

use Spatie\Feed\FeedItem;

class Feed
{
    public function posts()
    {
        return all_posts()->where('technical', false)->map(function ($post) {
            return FeedItem::create([
                'id' => route('posts.show', $post['slug']),
                'title' => $post['title'],
                'summary' => $post['html'],
                'updated' => $post['date'],
                'link' => route('posts.show', $post['slug']),
                'authorName' => 'Ben Borgers',
            ]);
        });
    }
}
