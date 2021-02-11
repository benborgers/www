const fs = require('fs')
const readdirp = require('readdirp')
const frontmatter = require('@github-docs/frontmatter')
const escape = require('escape-html')
const marked = require('marked')
const { minify } = require('html-minifier')
const removeMarkdown = require('remove-markdown')

const prism = require('prismjs')
require('prismjs/components/prism-markup-templating')
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

if(fs.existsSync('./public')) fs.rmdirSync('./public', { recursive: true })
fs.mkdirSync('./public')

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

const base = ({ title, description, classes = '', body }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>${title ? title + ' - ' : ''}Ben Borgers</title>
        <link rel="icon" href="https://emojicdn.elk.sh/🐢" />

        ${description ? `
        <meta name="description" content="${escape(removeMarkdown(description.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ')))}" />` : ''}

        <link rel="stylesheet" href="/style.css">
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
                <div>
                    <h1>${data.title}</h1>
                    <time>Updated ${data.date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</time>
                </div>

                <div>
                    ${marked(content)}
                </div>
            `
        }))
    })
})()
