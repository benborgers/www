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
                <p>
                    Follow <a href="https://twitter.com/benborgers" target="_blank" onclick="fathom.trackGoal('E3LD3YS1')">my twitter (@benborgers)</a>
                    to see the work-in-progress of coding projects I’m working on!
                </p>
            @endif
        </x-prose.blog>
    </x-layouts.blog>

    @push('head')
        <link rel="stylesheet" href="https://unpkg.com/github-syntax-light@0.5.0/lib/github-light.css" />
    @endpush
</x-layouts.app>
