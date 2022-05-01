<x-layouts.app :title="$post['title']">
    <x-layouts.blog>
        <div class="mb-8 space-y-1 sm:space-y-2">
            <h1 class="font-fraunces font-black text-3xl text-zinc-900">{{ $post['title'] }}</h1>
            <p class="text-zinc-400 font-medium">{{ $post['date']->format('F j, Y') }}</p>
        </div>

        <x-prose.blog>
            @isset($post['html'])
                {!! $post['html'] !!}
            @else
                <x-markdown>
                    {!! $post['markdown'] !!}
                </x-markdown>
            @endisset

            @if($post['technical'])
                <hr />
                <ul>
                    <li>
                        If you have any lingering questions or corrections, email me at <a href="mailto:benborgers@hey.com">benborgers@hey.com</a>
                    </li>
                    <li>
                        Check out <a href="https://twitter.com/benborgers" onclick="fathom.trackGoal('E3LD3YS1')">my twitter</a>
                        to follow along with what I’m working on.
                    </li>
                    <li>
                        I write a <a href="{{ route('posts.index') }}">daily blog post</a> on this website!
                    </li>
                </ul>
            @endif
        </x-prose.blog>
    </x-layouts.blog>
</x-layouts.app>
