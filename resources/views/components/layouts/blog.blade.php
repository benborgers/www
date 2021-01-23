@props(['title' => null])

<x-layouts.base :title="$title">
    <div class="max-w-prose mx-auto p-4 pb-24 sm:px-0 sm:pt-6">
        <header class="mb-16 sm:mb-24 flex items-center justify-between">
            <div>
                <div class="w-5 h-5 bg-gradient-to-tr from-red-300 to-blue-400 rounded-full"></div>
                <a href="{{ route('home') }}">
                    <div class="py-1 px-2 rounded-lg bg-white border border-gray-200 shadow-lg -mt-3 ml-2">
                        <p class="font-semibold text-gray-700">Ben&nbsp;Borgers</p>
                    </div>
                </a>
            </div>

            @unless(request()->route()->getName() === 'posts.index')
                <div>
                    <a href="{{ route('posts.index') }}" class="text-gray-400 font-medium transition-colors hover:text-gray-600 duration-100 flex items-center space-x-1.5">
                        <x-heroicon-o-newspaper class="h-4" />
                        <span>All posts</span>
                    </a>
                </div>
            @endunless
        </header>

        <main>
            {{ $slot }}
        </main>
    </div>
</x-layouts.base>
