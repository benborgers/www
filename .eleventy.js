const smartquotes = require('smartquotes')
const katex = require('katex')

module.exports = eleventyConfig => {
    eleventyConfig.addFilter('dump', value => {
        console.log(value)
        return 'dumped'
    })

    eleventyConfig.addFilter('smartQuotes', value => {
        return smartquotes(value)
    })

    eleventyConfig.addFilter('extendMarkdown', value => {
        return value.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
            const cleanEquation = equation
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')

            return katex.renderToString(cleanEquation, { throwOnError: false })
        })
    })

    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

    eleventyConfig.addPassthroughCopy({ '_assets': 'assets' })
    eleventyConfig.addPassthroughCopy('admin/config.yml')

    eleventyConfig.addCollection('posts', collection => {
        return collection
            .getFilteredByGlob('posts/*.md')
    })

    eleventyConfig.addCollection('nonProgrammingPosts', collection => {
        return collection
            .getFilteredByGlob('posts/*.md')
            .filter(p => !(p.data.tags || []).includes('programming'))
    })

    const markdownIt = require('markdown-it')
    const markdownItOptions = {
        html: true,
        linkify: true,
        typographer: true
    }

    const md = markdownIt(markdownItOptions)
    const headingOverride = (tokens, id) => {
        const token = tokens[id]
        const number = Number(token.tag.substr(1))
        return `<${token.type === 'heading_close' ? '/' : ''}h${number + 1}>`
    }
    md.renderer.rules.heading_open = headingOverride
    md.renderer.rules.heading_close = headingOverride

    eleventyConfig.setLibrary('md', md)
}
