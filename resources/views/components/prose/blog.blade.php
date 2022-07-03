<div
    @class([
        'prose--blog',
        'prose max-w-none',
        'prose-zinc prose-rose',
        'prose-headings:font-fraunces',
        'prose-img:mx-auto prose-video:mx-auto',
        'prose-img:max-h-[70vh] prose-video:max-h-[70vh]',
        'prose-figcaption:text-center',
        'prose-img:w-auto prose-video:w-auto',
        'prose-pre:!bg-zinc-100 prose-pre:text-zinc-800',
        'before:prose-code:content-none',
        'after:prose-code:content-none',
        '[&_summary]:cursor-pointer [&_summary]:bg-zinc-100 [&_summary]:px-4 [&_summary]:py-2 [&_summary]:rounded-xl',
    ])
>
  {{ $slot }}
</div>
