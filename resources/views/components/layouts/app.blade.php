@props(['title'])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $title }}</title>
        <link rel="icon" href="https://emojicdn.elk.sh/🐙">
        <meta property="og:image" content="https://v1.screenshot.11ty.dev/{{ urlencode(route('ogImage', ['title' => $title])) }}/opengraph">

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <script src="{{ mix('js/app.js') }}" defer></script>
        <style>[x-cloak] { display: none !important; }</style>

        @stack('head')

        <script src="https://owl.benborgers.com/script.js" data-site="ZWCPJCUA" data-included-domains="benborgers.com" defer></script>

        @livewireStyles
    </head>
    <body class="antialiased">
        {{ $slot }}

        @livewireScripts
    </body>
</html>
