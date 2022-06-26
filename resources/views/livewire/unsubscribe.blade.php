@push('head')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;900&family=Public+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
@endpush

<div class="p-4 sm:pt-12 font-public-sans">
    <div class="mx-auto bg-white p-4 rounded-xl shadow w-full max-w-md">
        <h1 class="text-xl font-bold text-zinc-900 font-fraunces">Unsubscribe from Ben’s Newsletter</h1>

        @if($success)
            <div class="text-gray-600 mt-4">
                <p>You’ve been unsubscribed.</p>
            </div>
        @else
            <form wire:submit.prevent="submit" class="mt-4">
                <input
                    type="email"
                    wire:model.defer="email"
                    class="w-full rounded-lg bg-zinc-50 border-zinc-300 placeholder:text-zinc-400 focus:ring-rose-500 focus:border-rose-500"
                />
                @error('email')
                    <p class="text-rose-600 mt-1 text-sm font-medium">{{ $message }}</p>
                @enderror

                <div class="flex justify-end mt-3">
                    <button
                        type="submit"
                        class="bg-zinc-900 text-zinc-50 font-semibold text-sm px-2 py-1 rounded-lg"
                        wire:loading.delay.attr="disabled"
                    >
                        <span wire:loading.delay.remove>Subscribe</span>
                        <span wire:loading.delay>Loading...</span>
                    </button>
                </div>
            </form>
        @endif
    </div>
</div>
