import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function CatchAll({ code, frontmatter }) {
    const MDXComponent = useMemo(() => getMDXComponent(code), [code])

    return (
        <div>
            <MDXComponent />
        </div>
    )
}

import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'

export async function getStaticProps(context) {
    const filePath = `mdx/${context.params.slug}.mdx`
    const mdxSource = fs.readFileSync(filePath, 'utf-8')

    const { code, frontmatter } = await bundleMDX(mdxSource)

    for(const key in frontmatter) {
        if(frontmatter[key] instanceof Date) {
            // Next.js cannot serialize dates in props.
            frontmatter[key] = frontmatter[key].getTime()
        }
    }

    return {
        props: {
            code,
            frontmatter
        }
    }
}

export function getStaticPaths() {
    const paths = fs.readdirSync('mdx').map(filename => '/' + filename.replace(/\.mdx$/, ''))
    return {
        paths,
        fallback: false
    }
}
