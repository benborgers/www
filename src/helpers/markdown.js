/* Parses markdown to HTML */
import snarkdown from 'snarkdown'
import prism from 'prismjs'

import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-jsx'

const markdown = text => {
    const md = snarkdown(text)
    return md.replace(/<code class="language-(.+?)">([^]+?)<\/code>/g, (...args) => {
        const lang = args[1]
        const code = args[2]
        try {
            return `<code class="language-${lang}">${prism.highlight(code, prism.languages[lang], lang).replace(/&amp;/g, '&')}</code>`
        } catch {
            return `<code class="language-${lang}">${code}</code>`
        }
    })
}

export default markdown
