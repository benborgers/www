<x-layouts.app title="Ben Borgers">
    <x-layouts.blog>
        <h1 class="mb-2 text-lg font-black font-fraunces">Hi! I’m Ben Borgers</h1>
        <x-prose.blog>
            {!! $content !!}
        </x-prose.blog>
    </x-layouts.blog>
</x-layouts.app>
