import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Layout from '../components/Layout'
import Pre from '../components/Pre'
import A from '../components/A'

import ReactDOM from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'

export default function CatchAll({ code, frontmatter }) {
    const Component = useMemo(() => getMDXComponent(code, { ReactDOM, nextLink: Link, nextImage: Image }), [code])

    const FullComponent = () => (
        <Component
            components={{
                pre: Pre,
                a: A
            }}
        />
    )

    return <Layout MDXComponent={FullComponent} frontmatter={frontmatter} />
}

import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'

export async function getStaticProps(context) {
    const filePath = `mdx/${context.params.slug || 'index'}.mdx`
    const mdxSource = fs.readFileSync(filePath, 'utf-8')

    const { code, frontmatter } = await bundleMDX(mdxSource, {
        globals: {
            'next/link': 'nextLink',
            'next/image': 'nextImage'
        }
    })

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
    const paths = fs.readdirSync('mdx').map(filename => {
        let slug = filename.replace(/\.mdx$/, '')
        if(slug === 'index') slug = ''
        return `/${slug}`
    })
    return {
        paths,
        fallback: false
    }
}
