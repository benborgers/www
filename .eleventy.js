module.exports = eleventyConfig => {
    eleventyConfig.addFilter('dump', value => {
        console.log(value)
        return 'dumped'
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