const fs = require('fs')
const fse = require('fs-extra')
const readdirp = require('readdirp')
const frontmatter = require('@github-docs/frontmatter')
const escape = require('escape-html')
const marked = require('marked')
const { minify } = require('html-minifier')
const fetch = require('node-fetch')

const prism = require('prismjs')
require('prismjs/components/prism-markup-templating')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-css')
require('prismjs/components/prism-php')
require('prismjs/components/prism-json')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-yaml')
require('prismjs/components/prism-toml')
require('prismjs/components/prism-java')

marked.setOptions({
    smartypants: true,
    highlight: (code, lang) => prism.languages[lang] ? prism.highlight(code, prism.languages[lang]) : code
})

const writeFile = (path, contents) => {
    let folders = path.split('/')
    folders.pop()
    folders = folders.join('/')
    fs.mkdirSync(`./public/${folders}`, { recursive: true })

    const minifiedHtml = minify(contents, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true
    })
    fs.writeFileSync(`./public/${path}`, minifiedHtml)
    console.log(`> Wrote ${path}`)
}

const linkFromPath = path => {
    const clean = path.replace(/index$/, '')
    return (clean.startsWith('/') ? '' : '/') + clean.replace(/\/$/, '')
}

// Disabled because there are no assets right now.
// fse.copySync('./assets', './public/assets')

const base = ({ title, description, classes = '', body }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>${title ? title + ' - ' : ''}Ben Borgers</title>
        <link rel="icon" href="https://emojicdn.elk.sh/🐙" />

        ${description ? `
        <meta name="description" content="${escape(
            description
                .replace(/<.+?>/g, '')
                .replace(/\n/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim()
        )}" />` : ''}

        <link rel="stylesheet" href="/style.css">
        ${body.includes('language-') && !body.includes('data-slug') ? `
            <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.5.0/themes/prism-dracula.css" />
        ` : ''}
        ${body.includes('language-') && body.includes('data-slug') ? `
            <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.6.0/styles/dracula.min.css" />
            <script src="https://unpkg.com/@highlightjs/cdn-assets@10.6.0/highlight.min.js"></script>
            <script>hljs.highlightAll()</script>
        ` : ''}
        ${body.includes('katex-html') ? `
            <link rel="stylesheet" href="https://unpkg.com/katex@0.12.0/dist/katex.min.css" />
        ` : ''}
    </head>
    <body class="font-sans text-gray-700 antialiased bg-white ${classes}">
        ${body}
    </body>
</html>
`;

const notionSlugs = [] // For de-duplication
const notionDocToPage = async ({ id, slug = id }) => {
    notionSlugs.push(slug)
    const html = await (await fetch(`https://friede.gg/api/notion/html/${id}?downgrade_headings=true`)).text()
    const processedHtml = html.replace(/data-page-id="/g, 'href="/')
    const metadata = await (await fetch(`https://friede.gg/api/notion/metadata/${id}`)).json()

    if(html.includes('Untitled')) {
        throw new Error(`Page linked on ${metadata.title} (${id}) is not public.`)
    }

    writeFile(`${slug}.html`, base({
        title: slug === 'index' ? null : metadata.title,
        description: processedHtml,
        classes: 'bg-orange-50 font-serif',
        body: `
            <div class="p-4 sm:pt-24 pb-24 max-w-prose mx-auto" data-slug="${slug}">
                <div>
                    <a href="/" class="inline-block font-sans text-blue-800 font-semibold mb-8">Ben Borgers</a>
                </div>
                ${slug !== 'index' ? `
                    <div class="mb-8 space-y-1.5">
                        <h1 class="font-sans font-extrabold text-3xl text-gray-900">${metadata.title}</h1>
                        <p class="font-sans text-gray-500 text-sm font-medium italic">Updated <time>${new Date(metadata.updated_at).toLocaleString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>
                ` : ''}
                <div class="prose prose-garden">
                    ${processedHtml}
                </div>
            </div>
        `
    }))

    const links = (html.match(/data-page-id="(.+?)"/g) || []).map(str => str.replace(/^data-page-id="|"$/g, ''))
    links.forEach(async link => {
        if(! notionSlugs.includes(link)) {
            await notionDocToPage({ id: link })
        }
    })
}

(async () => {
    const posts = await readdirp.promise('./posts')
    posts.forEach(post => {
        const markdown = fs.readFileSync(`./posts/${post.path}`, 'utf-8')
        const { data, content } = frontmatter(markdown)
        writeFile(`posts/${post.path.replace(/\md$/, 'html')}`, base({
            title: data.title,
            description: marked(content),
            body: `
                <div class="p-4 sm:pt-6 pb-24 max-w-prose mx-auto">
                    <div class="flex mb-12 sm:mb-24">
                        <div>
                            <div class="w-5 h-5 bg-gradient-to-tr from-red-300 to-blue-400 rounded-full"></div>
                            <a href="/">
                                <div class="py-1 px-2 rounded-lg bg-white border border-gray-200 shadow-lg -mt-3 ml-2">
                                    <p class="font-semibold text-gray-700">Ben&nbsp;Borgers</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h1 class="text-3xl font-black text-gray-800 mb-2 leading-snug">${data.title}</h1>
                        <p class="text-gray-400">Updated <time>${data.date.toLocaleString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>

                    <div class="prose prose-posts">
                        ${marked(content)}
                    </div>

                    <div class="pt-4 mt-16 border-t-2 border-gray-200">
                        <p class="text-gray-500">
                            Was anything confusing, outdated, or incorrect? Please let me know!
                            <a href="mailto:benborgers@hey.com" class="underline">benborgers@hey.com</a>
                        </p>
                    </div>
                </div>
            `
        }))
    })

    await notionDocToPage({ id: 'a81d0c09-5d6f-4310-baf6-2fc2938b89d2', slug: 'index' })
})()
