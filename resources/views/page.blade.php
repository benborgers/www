<x-layouts.app :title="$page['title']" bg="bg-neutral-900 font-sf-rounded">
    <a href="{{ route('index') }}" class="block group w-full fixed top-0 inset-x-0 p-4 bg-neutral-900/60 backdrop-blur-lg border-b border-neutral-800">
        <div class="max-w-screen-sm mx-auto">
            <p @class([
                'block text-neutral-400 font-medium',
                'group-hover:underline group-hover:decoration-neutral-600'
            ])>
                benborgers.com
            </p>
        </div>
    </a>

    <div class="p-4 pt-48 pb-36">
        <div class="max-w-screen-sm mx-auto">
            <div>
                <h1 class="text-3xl font-extrabold text-white">{{ $page['title'] }}</h1>
                <p class="mt-1 text-neutral-500">
                    — last updated {{ strtolower($page['updated_at']->format('F Y')) }}
                </p>
            </div>

            <div @class([
                'mt-16',
                'prose prose-neutral !prose-invert',
                'prose-p:tracking-wide prose-li:tracking-wide'
            ])>
                {!! $page['html'] !!}
            </div>
        </div>
    </div>

    @push('head')
        <link rel="stylesheet" href="{{ mix('css/sf-rounded.css') }}">
    @endpush
</x-layouts.app>