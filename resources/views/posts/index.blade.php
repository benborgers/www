@php($page = request('page', 1))

<x-layouts.blog title="Posts">
    <div class="mb-12">
        <x-title>
            All posts
            <span class="text-gray-300">(pg. {{ $page }})</span>
        </x-title>
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

    <div class="mt-8 flex justify-between">
        <div>
            @if(Cache::has('posts-' . $page -1))
                <a
                    href="{{ route('posts.index', ['page' => $page -1]) }}"
                    class="border border-gray-200 px-3 py-1 rounded-lg flex items-center space-x-2 text-gray-500 duration-150 hover:bg-gray-100"
                    style="transition-property: background-color"
                >
                    <x-heroicon-s-arrow-left class="h-3" />
                    <span>Previous</span>
                </a>
            @endif
        </div>

        <div>
            @if(Cache::has('posts-' . $page +1))
                <a
                    href="{{ route('posts.index', ['page' => $page +1]) }}"
                    class="border border-gray-200 px-3 py-1 rounded-lg flex items-center space-x-2 text-gray-500 duration-150 hover:bg-gray-100"
                    style="transition-property: background-color"
                >
                    <span>Next</span>
                    <x-heroicon-s-arrow-right class="h-3" />
                </a>
            @endif
        </div>
    </div>
</x-layouts.blog>
