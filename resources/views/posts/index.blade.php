<x-layouts.blog title="Posts">
    <h1 class="font-bold text-3xl sm:text-4xl text-gray-900 mb-8 font-serif">All posts</h1>

    <div class="space-y-4">
        @foreach ($posts as $post)
            <a href="" class="block">
                <section class="bg-gray-100 hover:bg-gray-200 transition-colors duration-150 border border-gray-200 p-4 rounded-lg">
                    <p class="font-medium text-lg">{{ $post['title'] }}</p>
                    <p class="text-gray-400">Updated {{ Carbon\Carbon::parse($post['updated_at'])->setTimezone('America/New_York')->format('M d, Y') }}</p>
                </section>
            </a>
        @endforeach
    </div>
</x-layouts.blog>
