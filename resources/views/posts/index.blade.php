<x-layouts.blog title="Posts">
    <div class="mb-12">
        <x-title>All posts</x-title>
    </div>

    <div class="space-y-4">
        @foreach ($posts as $post)
            <a href="{{ route('posts.show', $post['number']) }}" class="block">
                <section class="bg-gray-100 hover:bg-gray-200 duration-150 border border-gray-200 p-4 rounded-lg" style="transition-property: background-color">
                    <p class="font-medium text-lg">{{ $post['title'] }}</p>
                    <p class="text-gray-400">Updated {{ format_date($post['updated_at'], 'M d, Y') }}</p>
                </section>
            </a>
        @endforeach
    </div>
</x-layouts.blog>
