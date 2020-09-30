/* Parses markdown to HTML */
import marked from 'marked'
import prism from 'prismjs'

import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-toml'

marked.setOptions({
    highlight: (code, lang) => {
        if(prism.languages[lang]) {
            return prism.highlight(code, prism.languages[lang], lang)
        } else {
            return code
        }
    }
})

const markdown = text => marked.parse(text)

export default markdown
