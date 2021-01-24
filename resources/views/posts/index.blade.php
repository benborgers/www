<x-layouts.blog title="Posts">
    <h1 class="text-3xl sm:text-4xl font-black text-gray-800 mb-8">All posts</h1>

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
