<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $title ? $title . ' - ' : '' }}Ben Borgers</title>
        <link rel="icon" href="{{ asset('images/favicon.png') }}" />

        @isset($description)
            <meta name="description" content="{{ Str::of($description)->replaceMatches('/\n/', '  ')->replaceMatches('/\s{2,}/', ' ') }}" />
        @endisset

        <link rel="stylesheet" href="{{ asset('css/style.css') }}">

        @if(env('APP_ENV') === 'production')
            <script src="https://anteater.benborgers.com/script.js" data-site="ZWCPJCUA" defer></script>
        @endif

        @stack('head')
    </head>
    <body class="font-sans text-gray-700 antialiased bg-white">
        {{ $slot }}
    </body>
</html>
