<x-layouts.app title="Ben Borgers’ Blog">
    <x-layouts.blog>
        @foreach($posts as $post)
            @if($loop->index === 0 || $posts[$loop->index-1]['date']->month != $post['date']->month)
                <h2 class="mt-8 text-lg text-gray-800 font-extrabold">{{ $post['date']->format('F Y') }}</h2>
            @endif

            <a
                href="/posts/{{ $post['slug'] }}"
                class="block max-w-max ml-4 mt-2 text-gray-700 underline decoration-gray-300"
            >
                {{ $post['title'] }}
            </a>
        @endforeach
    </x-layouts.blog>
</x-layouts.app>
