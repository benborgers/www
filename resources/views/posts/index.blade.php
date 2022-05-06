<x-layouts.app title="Ben Borgers’ Blog">
    <x-layouts.blog>
        <div class="text-zinc-700 space-y-2 bg-zinc-100 p-4 rounded-xl">
            @if($posts->first()['technical'])
                <p>
                    These are my blog posts on niche programming solutions,
                    which are probably only interesting if you’re searching for a specific solution.
                </p>
                <p>
                    <a href="{{ route('posts.index') }}" class="font-medium underline decoration-zinc-400">
                        The rest of my blog posts are here
                    </a>.
                </p>
            @else
                <p>
                    Welcome to my blog! I’ve written a post here every day for
                    <span class="font-fraunces font-semibold">{{ $streak }}</span>
                    {{ str()->plural('day', $streak) }} in a row.
                </p>
                <p>I hope some of it is interesting! If it is, I’d love to hear from you.</p>
                <p class="text-zinc-500">
                    I also write blog posts about programming,
                    but they’re niche and meant to be found when searching. Still, you can
                    <a href="{{ route('posts.technicalIndex') }}" class="font-medium underline decoration-zinc-400">see the list of them here</a>.
                </p>
            @endif
        </div>

        @unless($posts->first()['technical'])
            @livewire('newsletter-signup')
        @endunless

        <div class="mt-6">
            @foreach($posts as $post)
                @if(
                    $months &&
                    ($loop->index === 0 || $posts[$loop->index-1]['date']->month != $post['date']->month)
                )
                    <h2 @class([
                        'text-lg text-zinc-900 font-extrabold',
                        'mt-8' => !$loop->first
                    ])>{{ $post['date']->format('F Y') }}</h2>
                @endif
                <div
                    @class([
                        'ml-4' => $months,
                        'mt-2 sm:flex sm:justify-between sm:space-x-4'
                    ])
                >
                    <a href="{{ route('posts.show', $post['slug']) }}" class="block text-zinc-700 underline decoration-zinc-300">{{ $post['title'] }}</a>
                    <p class="text-zinc-300 whitespace-nowrap">{{ $post['date']->format('M j, Y') }}</p>
                </div>
            @endforeach
                </x-layouts.blog>
        </div>
</x-layouts.app>
