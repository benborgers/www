<section
    class="mt-4 text-zinc-700 bg-zinc-100 p-4 rounded-xl transition-[padding]"
    x-data="{ newsletterExpanded: $persist(true) }"
    :class="{ 'py-1': !newsletterExpanded }"
    x-cloak
>
    @if($success)
        <p class="font-black font-fraunces text-zinc-900" x-init="newsletterExpanded = false">
            Subscribed! Thank you :)
        </p>
    @else
        <div
            class="flex justify-between"
            :class="{ 'items-start': newsletterExpanded, 'items-center': !newsletterExpanded }"
        >
            <p class="font-fraunces font-black text-zinc-900">Want to keep up with my world?</p>

            <button
                x-on:click="newsletterExpanded = !newsletterExpanded"
            >
                <x-heroicon-o-x class="h-4 w-4 text-zinc-400" x-show="newsletterExpanded" />
                <x-heroicon-o-chevron-down class="h-4 w-4 text-zinc-400" x-show="!newsletterExpanded" />
            </button>
        </div>

        <div
            class="grid sm:grid-cols-2 grid-rows-[repeat(2,max-content)] gap-x-4 gap-y-2 sm:gap-y-0 mt-1"
            x-show="newsletterExpanded"
            x-collapse.duration.150ms
        >
            <div>
                <p>
                    I write a weekly newsletter with new blog posts and assorted life updates!
                </p>

                <p class="text-zinc-400 text-sm mt-2">
                    If it’s not your cup of tea, you can unsubscribe anytime.
                </p>
            </div>

            <form wire:submit.prevent="submit" class="flex flex-col items-end space-y-3 mt-1">
                <div class="w-full">
                    <input
                        wire:model.defer="email"
                        type="email"
                        placeholder="coolperson@gmail.com"
                        required
                        class="w-full rounded-lg bg-zinc-50 border-zinc-300 placeholder:text-zinc-400 focus:ring-rose-500 focus:border-rose-500"
                    />
                    @error('email')
                        <p class="text-rose-600 mt-1 text-right text-sm font-medium">{{ $message }}</p>
                    @enderror
                </div>
                <button
                    class="bg-zinc-900 text-zinc-50 font-semibold text-sm px-2 py-1 rounded-lg"
                    wire:loading.delay.attr="disabled"
                >
                    <span wire:loading.delay.remove>Subscribe</span>
                    <span wire:loading.delay>Subscribing...</span>
                </button>
            </form>
        </div>
    @endif
</section>
