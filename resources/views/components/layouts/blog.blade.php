@push('head')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@900&family=Public+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
@endpush

<div class="font-public-sans p-4 pb-36">
    <div class="sm:mt-16 max-w-prose mx-auto">
        {{ $slot }}
    </div>
</div>
