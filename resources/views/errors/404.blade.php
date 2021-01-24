<x-layouts.blog>
    <h1 class="bg-gradient-to-tr from-red-300 to-blue-400 bg-clip-text text-transparent font-bold text-center text-3xl sm:text-4xl">
        four-oh-four
        <br class="sm:hidden" />
        not found
    </h1>

    @php
        $array = Cache::get('404') ?? [];
        $array[] = '/' . request()->path();
        Cache::forever('404', $array);
    @endphp
</x-layouts.blog>
