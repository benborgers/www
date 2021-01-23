<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $title ? $title . ' - ' : '' }}Ben Borgers</title>
        <link rel="icon" href="https://emojicdn.elk.sh/🐢" />

        <link rel="stylesheet" href="{{ asset('css/style.css') }}">

        @stack('head')
    </head>
    <body class="font-sans text-gray-700 antialiased bg-white">
        {{ $slot }}
    </body>
</html>
