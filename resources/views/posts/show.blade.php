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
        </x-prose.blog>
    </x-layouts.blog>
</x-layouts.app>
