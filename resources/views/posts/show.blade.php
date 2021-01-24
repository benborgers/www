@push('head')
    <link rel="stylesheet" href="https://unpkg.com/github-syntax-light@0.5.0/lib/github-light.css" />
@endpush

<x-layouts.blog title="{{ $post['title'] }}">
    <div class="space-y-1 mb-12">
        <x-title>
            {{ $post['title'] }}
        </x-title>
        <time class="block text-gray-400">
            {{ format_date($post['updated_at']) }}
        </time>
    </div>

    <div class="prose sm:prose-lg">
        {!! $post['body_html'] !!}
    </div>
</x-layouts.blog>
