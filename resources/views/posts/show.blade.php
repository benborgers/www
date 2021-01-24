@push('head')
    <link rel="stylesheet" href="https://unpkg.com/github-syntax-light@0.5.0/lib/github-light.css" />
@endpush

<x-layouts.blog title="{{ $post['title'] }}">
    <div class="space-y-1 mb-12">
        <h1 class="text-3xl sm:text-4xl font-black text-gray-800 sm:leading-tight">
            {{ $post['title'] }}
        </h1>
        <time class="block text-gray-400">
            {{ format_date($post['updated_at']) }}
        </time>
    </div>

    <div class="prose sm:prose-lg">
        {!! $post['body_html'] !!}
    </div>
</x-layouts.blog>
