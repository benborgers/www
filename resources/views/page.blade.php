<x-layouts.app :title="$page['title']" bg="bg-neutral-900 font-sf-rounded">
    <div class="p-4 sm:pt-8 pb-24">
        <div class="max-w-prose mx-auto">
            <h1 class="text-3xl font-extrabold text-white">{{ $page['title'] }}</h1>

            <div class="mt-4 prose prose-neutral prose-blue !prose-invert">
                {!! $page['html'] !!}
            </div>
        </div>
    </div>

    @push('head')
        <link rel="stylesheet" href="{{ mix('css/sf-rounded.css') }}">
    @endpush
</x-layouts.app>
