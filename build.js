const fs = require('fs')
const fse = require('fs-extra')
const readdirp = require('readdirp')
const frontmatter = require('@github-docs/frontmatter')
const escape = require('escape-html')
const marked = require('marked')
const { minify } = require('html-minifier')
const fetch = require('node-fetch')
const crypto = require('crypto')

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
                .replace(/<h[1-6].*?>.*?<\/h[1-6]>/g, '') // Remove headings
                .replace(/<\/(p|li)>/g, ' ') // Add space between paragraphs
                .replace(/<.+?>/g, '')
                .replace(/\n/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim()
        )}" />` : ''}

        <link rel="stylesheet" href="/style.css">

        ${classes.includes('font-dm') ? `
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
        ` : ''}

        ${body.includes('language-') ? `
            <link rel="stylesheet" href="https://unpkg.com/prism-themes@latest/themes/prism-dracula.css" />
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

const notionData = {}
const loadNotionData = async id => {
    let html = await (await fetch(`https://friede.gg/api/notion/html/${id}?downgrade_headings=true`)).text()
    const metadata = await (await fetch(`https://friede.gg/api/notion/metadata/${id}`)).json()
    const linksTo = []

    console.log(`> Fetched from Notion: ${metadata.title}`)

    if(html.includes('Untitled</a>')) {
        console.warn(`Page linked on ${metadata.title} is not public.`)
        process.exit(1)
    }

    if(html.toLowerCase().includes('bad gateway')) {
        console.warn(`Bad Gateway detected on ${metadata.title}.`)
        process.exit(1)
    }

    // Download images locally to make them faster.
    // You could just delete this to speed up builds and everything would keep working,
    // since all the image src's would fall back to Notion's hosting.
    fs.mkdirSync('./public/img', { recursive: true })
    html = html.replace(/<img src="(.+?)"/g, (original, url) => {
        if(url.startsWith('https://www.notion.so/image')) {
            const extension = url.split('?')[0].split('.').pop()
            const hash = crypto.createHash('sha1').update(url).digest('hex')
            const path = `/img/${hash}.${extension}`
            fetch(url)
                .then(res =>
                    res.body.pipe(fs.createWriteStream(`./public${path}`))
                )
            console.log(`> img: downloaded ${path} (${metadata.title})`)
            return `<img src="${path}"`
        }
        console.log(`> img: skipped downloading ${url} (${metadata.title})`)
        return original
    })

    const links = (html.match(/data-page-id="(.+?)"/g) || []).map(str => str.replace(/^data-page-id="|"$/g, ''))

    html = html.replace(/data-page-id="/g, 'href="/')

    for(const link of links) {
        linksTo.push(link)
        if(! notionData[link]) {
            await loadNotionData(link)
        }
    }

    notionData[id] = {
        html,
        metadata,
        linksTo
    }
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

    const rootNotionId = 'a81d0c09-5d6f-4310-baf6-2fc2938b89d2'
    await loadNotionData(rootNotionId)

    for(const id in notionData) {
        const page = notionData[id]

        const slug = id === rootNotionId ? 'index' : id

        const backlinks = []
        for(const scanId in notionData) {
            if(notionData[scanId].linksTo.includes(id)) {
                backlinks.push({
                    id: scanId,
                    title: notionData[scanId].metadata.title
                })
            }
        }

        writeFile(`${slug}.html`, base({
            title: slug === 'index' ? null : page.metadata.title,
            description: page.html,
            classes: 'font-dm bg-gray-50',
            body: `
                <div class="p-4 md:pt-24 pb-24 max-w-prose mx-auto" data-slug="${slug}">
                    <div class="mb-8">
                        <a href="/" class="font-serif text-gray-500 hover:text-gray-700 duration-150 transition-colors italic font-bold">Ben Borgers</a>
                    </div>
                    ${slug !== 'index' ? `
                        <div class="mb-8 space-y-1.5">
                            <h1 class="font-bold text-3xl md:text-4xl text-gray-900">${page.metadata.title}</h1>
                            <p class="text-gray-500 text-sm font-medium italic">Updated <time>${new Date(page.metadata.updated_at).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                        </div>
                    ` : ''}
                    <div class="prose prose-garden md:prose-lg">
                        ${page.html}
                    </div>

                    ${backlinks.length > 0 ? `
                        <div class="mt-20">
                            <p class="text-gray-500">
                                This page is referenced in:
                                ${backlinks.reverse().map(backlink => `<a class="underline" href="/${backlink.id === rootNotionId ? '' : backlink.id}">${backlink.title}</a>`).join(', ')}
                            </p>
                        </div>
                    ` : ''}
                </div>
            `
        }))
    }
})()
