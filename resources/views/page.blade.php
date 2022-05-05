<x-layouts.app :title="$page['title']" bg="bg-stone-50 font-inter">
    <div class="p-4 pb-24 sm:p-8 sm:pb-24">
        <div class="flex items-start space-x-8">
            <a href="{{ route('index') }}" class="block mt-1 bg-rose-600 text-white px-2 py-0.5 font-bold tracking text-sm">
                ben&nbsp;borgers
            </a>

            <div class="max-w-prose">
                <h1 class="font-['Redaction_35'] text-3xl">{{ $page['title'] }}</h1>

                <div
                    @class([
                        'mt-6',
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
        <link rel="stylesheet" href="{{ mix('css/redaction.css' ) }}">
    @endpush
</x-layouts.app>
