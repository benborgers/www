<x-layouts.app :title="$page['title']" bg="bg-white font-sf-rounded">
    <div class="prose prose-stone">
        {!! $page['html'] !!}
    </div>

    @push('head')
        <link rel="stylesheet" href="{{ mix('css/sf-rounded.css') }}">
    @endpush
</x-layouts.app>
