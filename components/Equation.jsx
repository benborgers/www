import { renderToString } from 'katex'

export default function Equation({ inline = false, string }) {
    const Element = inline ? 'span' : 'div'

    return (
        <Element
            dangerouslySetInnerHTML={{
                __html: renderToString(string, {
                    throwOnError: false,
                    displayMode: !inline
                })
            }}
            className={inline ? '' : 'my-8'}
        />
    )
}
