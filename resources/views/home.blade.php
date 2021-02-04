<x-layouts.blog description="Hi! I’m Ben Borgers. I’m a high school senior in Boston, and interned at IBM last summer. Next fall, I’m headed to Tufts University to study computer science.">
    <div class="mb-12 bg-gradient-to-tr from-red-300 to-blue-400 rounded-xl text-white font-semibold p-3 sm:p-4 space-y-4">
        <p>
            Hi! I’m Ben Borgers. I’m a high school senior in Boston, and interned at IBM last summer.
            Next fall, I’m headed to Tufts University to study computer science.
        </p>

        <p>
            I’m on <a href="https://twitter.com/benborgers" class="underline">twitter</a> and <a href="https://github.com/benborgers" class="underline">github</a>.
            If you wanna get in touch, I love getting emails: <a href="mailto:benborgers@hey.com" class="underline">benborgers@hey.com</a>
        </p>
    </div>

    <div class="space-y-12">
        @foreach ($projects as $heading => $items)
            <div>
                <h2 class="text-xl text-gray-900 font-serif font-semibold mb-4">{{ $heading }}</h2>
                <div class="space-y-4">
                    @foreach ($items as $item)
                        <div class="bg-gray-100 p-3 sm:p-4 rounded-lg space-y-1">
                            <p class="font-bold">{{ $item->name }}</p>
                            <p class="text-gray-600">{{ $item->description }}</p>
                            @isset($item->link)
                                <a href="https://{{ $item->link }}" class="inline-block">
                                    <div class="text-gray-400 hover:text-gray-500 duration-100 transition-colors flex space-x-1 items-center">
                                        <x-heroicon-s-external-link class="h-4" />
                                        <p class="text-sm font-medium">{{ $item->link }}</p>
                                    </div>
                                </a>
                            @endisset
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
</x-layouts.blog>
