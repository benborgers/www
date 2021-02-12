const fs = require('fs')
const fse = require('fs-extra')
const readdirp = require('readdirp')
const frontmatter = require('@github-docs/frontmatter')
const escape = require('escape-html')
const marked = require('marked')
const { minify } = require('html-minifier')
const removeMarkdown = require('remove-markdown')
const katex = require('katex')

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

const sitemap = []

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
    sitemap.push(linkFromPath(path.replace(/\.html$/, '')))
}

const linkFromPath = path => {
    const clean = path.replace(/index$/, '')
    return (clean.startsWith('/') ? '' : '/') + clean.replace(/\/$/, '')
}

const pageTitle = path => {
    if(path.endsWith('garden/index.md')) return 'Home'
    const file = fs.readFileSync(path, 'utf-8')
    return frontmatter(file).data.title
}

fse.copySync('./assets', './public/assets')

const base = ({ title, description, classes = '', body }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>${title ? title + ' - ' : ''}Ben Borgers</title>
        <link rel="icon" href="/assets/favicon.png" />

        ${description ? `
        <meta name="description" content="${escape(removeMarkdown(description.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ')))}" />` : ''}

        <link rel="stylesheet" href="/style.css">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        ${body.includes('language-') ? `
        <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.5.0/themes/prism-dracula.css" />
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

(async () => {
    const posts = await readdirp.promise('./posts')
    posts.forEach(post => {
        const markdown = fs.readFileSync(`./posts/${post.path}`, 'utf-8')
        const { data, content } = frontmatter(markdown)
        writeFile(`posts/${post.path.replace(/\md$/, 'html')}`, base({
            title: data.title,
            description: content,
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
                        <p class="text-gray-400">Updated <time>${data.date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>

                    <div class="prose prose-posts">
                        ${marked(content)}
                    </div>
                </div>
            `
        }))
    })

    const garden = await readdirp.promise('./garden')
    const connectionsRegex = /\[\[(.*?)\]\]/g

    const gardenConnections = {}
    garden.forEach(file => {
        const markdown = fs.readFileSync(`./garden/${file.path}`, 'utf-8')
        const linkedFrom = file.path.replace(/\.md$/, '')
        const linkedPages = (markdown.match(connectionsRegex) || []).map(x => x.replace(/\[|\]/g, '').split(',')[0])
        linkedPages.forEach(page => {
            if(!gardenConnections[page]) gardenConnections[page] = []
            gardenConnections[page].push(linkedFrom)
        })
    })

    const parseGardenMarkdown = text => {
        text = text
            .replace(connectionsRegex, (_, inside) => {
                let path = inside
                let title
                if(path.includes(',')) {
                    [path, title] = inside.split(',').map(x => x.trim())
                }
                const titleFromFrontmatter = pageTitle(`./garden/${path}.md`)

                const span = (end = false) => `<span class="text-gray-400">${end ? ']]' : '[['}</span>`
                return `${span()}<a href="${linkFromPath(path)}">${title || titleFromFrontmatter}</a>${span(true)}`
            })
            .replace(/\$\$(.+?)\$\$/g, (_, equation) => {
                return katex.renderToString(equation)
            })

        return marked(text)
    }

    garden.forEach(file => {
        const markdown = fs.readFileSync(`./garden/${file.path}`, 'utf-8')
        const { data, content } = frontmatter(markdown)
        const connections = gardenConnections[file.path.replace(/\.md$/, '')]
        writeFile(file.path.replace(/md$/, 'html'), base({
            title: data.title,
            description: content,
            classes: 'bg-orange-50 font-serif',
            body: `
                <div class="p-4 sm:pt-24 pb-24 max-w-prose mx-auto">
                    <div>
                        <a href="/" class="inline-block font-sans text-blue-800 font-semibold mb-8">Ben Borgers</a>
                    </div>

                    ${data.title ? `
                        <div class="mb-8">
                            <h1 class="font-sans font-extrabold text-3xl text-gray-900">${data.title}</h1>
                        </div>
                    ` : ''}

                    <div class="prose prose-garden">
                        ${parseGardenMarkdown(content)}
                    </div>

                    ${connections ? `
                        <div class="mt-20">
                            <p class="text-gray-500">
                                This page is referenced in:
                                ${connections.map(path => `<a class="underline" href="${linkFromPath(path)}">${pageTitle(`./garden/${path}.md`)}</a>`).join(', ')}
                            </p>
                        </div>
                    ` : ''}

                </div>
            `
        }))
    })

    // Generate sitemap
    fs.writeFileSync('./public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemap.map(link => `
                <url>
                    <loc>https://benborgers.com${link}</loc>
                </url>
            `).join('')}
        </urlset>
    `)
})()
