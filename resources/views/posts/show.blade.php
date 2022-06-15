<x-layouts.app :title="$post['title']">
    <x-layouts.blog>
        <div class="mb-8 space-y-1 sm:space-y-2">
            <h1 class="font-fraunces font-black text-3xl text-zinc-900">{{ $post['title'] }}</h1>
            <p class="text-zinc-400 font-medium">{{ $post['date']->format('F j, Y') }}</p>
        </div>

        <x-prose.blog>
            @isset($post['html'])
                @if($post['technical'])
                    {!! $post['html'] !!}
                @else
                    <div
                        x-data="{ turbo: $persist(false), originalContent: null }"
                        x-init="function() {
                            originalContent = $refs.content.innerHTML

                            function update() {
                                if (turbo) {
                                    $refs.content.querySelectorAll('p, li, em').forEach(el => {
                                        const children = el.childNodes

                                        children.forEach(child => {
                                            if (child.nodeType === Node.TEXT_NODE) {
                                                const span = document.createElement('span')
                                                span.innerHTML = child.nodeValue.split(' ')
                                                    .map(word => {
                                                        if (word.length > 0) {
                                                            const length = word.replace(/[^a-zA-Z0-9]+$/, '').length
                                                            const boldedLength = Math.floor(length / 2)

                                                            if (boldedLength === 0) {
                                                                return word
                                                            }

                                                            return `<strong>${word.substring(0, boldedLength)}</strong>${word.substring(boldedLength)}`
                                                        }
                                                    }).join(' ')

                                                el.replaceChild(span, child)
                                            }
                                        })
                                    })
                                } else {
                                    $refs.content.innerHTML = originalContent
                                }
                            }

                            update()
                            $watch('turbo', update)
                        }"
                    >
                        <div class="not-prose flex justify-end" x-on:click="turbo = !turbo">
                            <button class="flex items-center space-x-2 cursor-pointer">
                                <span class="text-zinc-500 text-sm font-medium italic">Turbo Reader</span>
                                <div class="h-4 w-7 rounded-full" :class="{ 'bg-zinc-400': turbo, 'bg-zinc-200': !turbo }">
                                    <div
                                        class="bg-white shadow h-3 w-3 rounded-full mt-0.5 ml-0.5 transition-transform"
                                        :class="{ 'translate-x-3': turbo }"
                                    ></div>
                                </div>
                            </button>
                        </div>
                        <div x-ref="content">
                            {!! $post['html'] !!}
                        </div>
                    </div>
                @endif
            @else
                <x-markdown>
                    {!! $post['markdown'] !!}
                </x-markdown>
            @endisset

            @if($post['technical'])
                <hr />
                <p>
                    Follow <a href="https://twitter.com/benborgers" target="_blank" onclick="fathom.trackGoal('E3LD3YS1')">my twitter (@benborgers)</a>
                    to see the work-in-progress of coding projects I’m working on!
                </p>
            @endif
        </x-prose.blog>
    </x-layouts.blog>

    @push('head')
        <link rel="stylesheet" href="https://unpkg.com/github-syntax-light@0.5.0/lib/github-light.css" />
    @endpush
</x-layouts.app>
