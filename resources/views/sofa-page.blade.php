<x-layouts.app :title="$page->title" bg="bg-orange-100">
    <div class="p-4 sm:pt-8 pb-24">
        <div class="font-inter max-w-prose mx-auto">
            <a href="{{ route('index') }}">&larr; Ben Borgers</a>

            <h1>{{ $page->title }}</h1>
            <x-prose.sofa>
                <x-markdown>
                    {!! $page->body !!}
                </x-markdown>
            </x-prose.sofa>

            <p>last updated {{ $page->updated_at->format('F Y') }}</p>
        </div>
    </div>

    @push('head')
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @endpush
</x-layouts.app>
