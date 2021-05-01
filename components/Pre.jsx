import Highlight, { defaultProps } from 'prism-react-renderer'
import palenight from 'prism-react-renderer/themes/palenight'

import Prism from 'prism-react-renderer/prism'
(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-php')

export default function Pre({ children }) {
    const language = children.props.className.replace(/^language-/, '')

    return (
        <Highlight {...defaultProps} code={children.props.children.trim()} language={language} theme={palenight}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
