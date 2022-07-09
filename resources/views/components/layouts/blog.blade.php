@push('head')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
@endpush

<div class="font-public-sans">
    <nav class="bg-zinc-100 p-3 sm:p-0 sm:pt-16 mb-2 m-4 sm:m-0 rounded-xl sm:rounded-none flex sm:block gap-x-12 sm:gap-x-0 justify-center sm:h-screen sm:fixed sm:inset-y-0 sm:left-0 sm:w-16 sm:space-y-6">
        <a href="{{ route('index') }}" class="block group" aria-label="Home">
            <svg
                @class([
                    'mx-auto h-7 w-7 group-hover:scale-110 group-active:scale-95 transition-transform',
                    'fill-zinc-400' => Route::currentRouteName() !== 'index',
                    'fill-rose-600' => Route::currentRouteName() === 'index'
                ])
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M218.8,103.7,138.8,31a16,16,0,0,0-21.6,0l-80,72.7A16,16,0,0,0,32,115.5v92.1a16.4,16.4,0,0,0,4,11A15.9,15.9,0,0,0,48,224H96a8,8,0,0,0,8-8V168a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8v48a8,8,0,0,0,8,8h48a15.6,15.6,0,0,0,7.6-1.9A16.1,16.1,0,0,0,224,208V115.5A16,16,0,0,0,218.8,103.7Z"></path></svg>
        </a>
        <a href="{{ route('posts.index') }}" class="block group" aria-label="Blog">
            <svg
                @class([
                    'mx-auto h-7 w-7 group-hover:scale-110 group-active:scale-95 transition-transform',
                    'fill-zinc-400' => Route::currentRouteName() !== 'posts.index',
                    'fill-rose-600' => Route::currentRouteName() === 'posts.index'
                ])
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M201.5,54.5a103.8,103.8,0,0,0-147,0,103.8,103.8,0,0,0,0,147,103.8,103.8,0,0,0,147,0,103.8,103.8,0,0,0,0-147ZM128,170.9a31.9,31.9,0,0,0-32.3-9.8L111,128h34l15.3,33.1a31.9,31.9,0,0,0-32.3,9.8Zm40,35.5a89,89,0,0,1-32,9.2V192a16,16,0,0,1,32,0Zm22.2-16.2c-2,2-4.1,3.9-6.2,5.7V176a9.8,9.8,0,0,0-.7-3.4l-48-104h-.1a4.1,4.1,0,0,0-.5-.9c0-.1,0-.1-.1-.2l-.5-.7H134a4.6,4.6,0,0,0-.7-.7h-.2l-.7-.6h-.2l-.8-.5h-.1l-.9-.3h-.3l-.9-.2h-2.4l-1,.2h-.2l-.8.3h-.2l-.9.4h-.1l-.7.6h-.2l-.7.7h-.1l-.5.7-.2.2a4.1,4.1,0,0,1-.5.9l-22.1,48h0L72.7,172.6A9.8,9.8,0,0,0,72,176v19.9c-2.1-1.8-4.2-3.7-6.2-5.7a88,88,0,1,1,124.4,0Z"></path></svg>
        </a>
        <a href="https://twitter.com/benborgers" target="_blank" class="block group" onclick="fathom.trackGoal('E3LD3YS1')" aria-label="Twitter">
            <svg
                @class([
                    'mx-auto h-7 w-7 group-hover:scale-110 group-active:scale-95 transition-transform fill-zinc-400',
                ])
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M245.7,77.7l-30.2,30.1C209.5,177.7,150.5,232,80,232c-14.5,0-26.5-2.3-35.6-6.8-7.3-3.7-10.3-7.6-11.1-8.8a8,8,0,0,1,3.9-11.9c.2-.1,23.8-9.1,39.1-26.4a108.6,108.6,0,0,1-24.7-24.4c-13.7-18.6-28.2-50.9-19.5-99.1a8.1,8.1,0,0,1,5.5-6.2,8,8,0,0,1,8.1,1.9c.3.4,33.6,33.2,74.3,43.8V88a48.3,48.3,0,0,1,48.6-48,48.2,48.2,0,0,1,41,24H240a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,245.7,77.7Z"></path></svg>
        </a>
    </nav>

    <div class="p-4 pb-24 sm:pb-36 sm:ml-16">
        <div class="md:mt-16 sm:mt-11 max-w-screen-sm mx-auto">
            {{ $slot }}
        </div>
    </div>
</div>
