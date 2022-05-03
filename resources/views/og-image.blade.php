{{-- og:image --}}

<link rel="stylesheet" href="{{ mix('css/app.css') }}">
{{-- Using Google Fonts so we can tell it not to swap fonts, forcing 11ty screenshot to fully load font. --}}
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900" rel="stylesheet">

<div class="w-[1200px] h-[630px] font-inter bg-zinc-900 p-16 grid grid-rows-[1fr,max-content]">
    <p class="text-zinc-300 text-3xl font-medium">benborgers.com</p>
    <p class="font-black text-white text-8xl tracking-tight max-w-[1000px]">{{ $title }}</p>
</div>
