{{-- og:image --}}

<link rel="stylesheet" href="{{ mix('css/app.css') }}">

<div class="w-[1200px] h-[630px] bg-zinc-900 p-16 grid grid-rows-[1fr,max-content]">
    <p class="text-zinc-400 text-5xl font-medium">benborgers.com</p>
    <p
        @class([
            'font-black text-white tracking-tight max-w-[1000px]',
            'text-9xl' => strlen($title) <= 35,
            'text-8xl' => strlen($title) > 35
        ])
    >{{ $title }}</p>
</div>
