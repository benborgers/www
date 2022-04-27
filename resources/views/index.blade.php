<x-layouts.app title="Ben Borgers">
    <x-layouts.blog>
        <div class="mb-2 space-y-2">
            <img
                src="{{ asset('img/me.jpg') }}"
                class="h-24 w-auto rounded-full md:-ml-2"
            />

            <h1 class="text-lg font-black font-fraunces">Hi! I’m Ben Borgers.</h1>
        </div>

        <x-prose.blog>
            <x-markdown>
                {!! $content !!}
            </x-markdown>
        </x-prose.blog>
    </x-layouts.blog>
</x-layouts.app>
