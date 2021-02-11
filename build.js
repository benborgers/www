const fs = require('fs')
const fse = require('fs-extra')
const readdirp = require('readdirp')
const frontmatter = require('@github-docs/frontmatter')
const escape = require('escape-html')
const marked = require('marked')
const { minify } = require('html-minifier')
const removeMarkdown = require('remove-markdown')

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
        removeOptionalTags: true,
        minifyJS: true
    })
    fs.writeFileSync(`./public/${path}`, minifiedHtml)
    console.log(`> Wrote ${path}`)
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
                <div class="p-4 sm:px-0 sm:pt-6 pb-24 max-w-prose mx-auto">
                    <div class="flex mb-24">
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
                        <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-1">${data.title}</h1>
                        <p class="text-gray-400">Updated <time>${data.date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>

                    <div class="prose sm:prose-lg">
                        ${marked(content)}
                    </div>
                </div>
            `
        }))
    })
})()
