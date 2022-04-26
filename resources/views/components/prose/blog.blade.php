<div
    @class([
        'prose--blog',
        'prose max-w-none',
        'prose-zinc prose-rose',
        'prose-headings:font-fraunces',
        'prose-img:mx-auto prose-video:mx-auto',
        'prose-img:max-h-[80vh] prose-video:max-h-[80vh]',
        'prose-img:w-auto prose-video:w-auto',
        'prose-pre:!bg-zinc-100',
        'before:prose-code:content-none',
        'after:prose-code:content-none'
    ])
>
  {{ $slot }}
</div>
