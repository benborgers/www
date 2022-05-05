<x-layouts.app :title="$page['title']" bg="bg-stone-50 font-inter">
    <div class="p-4 pb-24 sm:p-6 sm:pb-24">
        <div class="flex items-start space-x-8">
            <a href="{{ route('index') }}" class="bg-rose-600 text-white px-2 py-0.5 font-bold tracking text-sm">
                ben borgers
            </a>

            <div class="max-w-prose">
                <h1>{{ $page['title'] }}</h1>
                <div
                    @class([
                        'prose prose-stone prose-rose max-w-none'
                    ])
                >
                    {!! $page['html'] !!}
                </div>
                {{-- <p>last updated {{ $page->updated_at->format('F Y') }}</p> --}}
            </div>
        </div>
    </div>

    @push('head')
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @endpush
</x-layouts.app>
