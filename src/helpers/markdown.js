/* Parses markdown to HTML */
const marked = require('marked')
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
    highlight: (code, lang) => {
        if(prism.languages[lang]) {
            return prism.highlight(code, prism.languages[lang], lang)
        } else {
            return code
        }
    },
    smartypants: true
})

const markdown = text => marked.parse(text)

module.exports = markdown
