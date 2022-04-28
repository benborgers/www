<x-layouts.app title="Ben Borgers’ Blog">
    <x-layouts.blog>
        <div>
            {{ $streak }}
        </div>

        @foreach($posts as $post)
            @if(
                $months &&
                ($loop->index === 0 || $posts[$loop->index-1]['date']->month != $post['date']->month)
            )
                <h2 @class([
                    'text-lg text-zinc-800 font-extrabold',
                    'mt-8' => !$loop->first
                ])>{{ $post['date']->format('F Y') }}</h2>
            @endif

            <div
                href="/posts/{{ $post['slug'] }}"
                @class([
                    'ml-4' => $months,
                    'mt-2 sm:flex sm:justify-between sm:space-x-4'
                ])
            >
                <a href="/posts/{{ $post['slug'] }}" class="block text-zinc-700 underline decoration-zinc-300">{{ $post['title'] }}</a>
                <p class="text-zinc-300 whitespace-nowrap">{{ $post['date']->format('M j, Y') }}</p>
            </div>
        @endforeach
    </x-layouts.blog>
</x-layouts.app>
