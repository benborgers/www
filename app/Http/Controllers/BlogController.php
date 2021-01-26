<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function home()
    {
        return view('home', [
            'projects' => data_file('projects')
        ]);
    }

    public function postsIndex()
    {
        $posts = collect(get_posts())
            ->sortByDesc('updated_at');

        return view('posts.index', [
            'posts' => $posts
        ]);
    }

    public function showPost($number)
    {
        if(! intval($number)) {
            $slugs = data_file('redirects');
            if(array_key_exists($number, (array) $slugs)) {
                return redirect()->route('posts.show', $slugs->{$number});
            }
        }

        $post = get_post($number);

        return view('posts.show', [
            'post' => $post
        ]);
    }
}
