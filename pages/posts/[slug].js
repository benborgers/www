import Link from 'next/link'
import Head from '../../components/Head'

export default function Post({ frontmatter, html }) {
    return (
        <>
            <Head
                title={frontmatter.title}
                description={html}
            />

            <div>
                <div className="p-4 sm:pt-6 pb-24 max-w-prose mx-auto">
                    <div className="flex mb-12 sm:mb-24">
                        <div>
                            <div className="w-5 h-5 bg-gradient-to-tr from-red-300 to-blue-400 rounded-full"></div>
                            <Link href="/">
                                <a>
                                    <div className="py-1 px-2 rounded-lg bg-white border border-gray-200 shadow-lg -mt-3 ml-2">
                                        <p className="font-semibold text-gray-700">Ben&nbsp;Borgers</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-gray-800 mb-2 leading-snug">{frontmatter.title}</h1>
                        <p className="text-gray-400">Updated <time>{new Date(frontmatter.date).toLocaleString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>
                    <div
                        className="prose prose-posts"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <div className="pt-4 mt-16 border-t-2 border-gray-200">
                        <p className="text-gray-500">
                            Was anything confusing, outdated, or incorrect? Please let me know!{' '}
                            <a href="mailto:benborgers@hey.com" className="underline">benborgers@hey.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

import fs from 'fs'
import frontmatter from '@github-docs/frontmatter'
import marked from 'marked'
import prism from 'prismjs'

import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-java'

marked.setOptions({
    smartypants: true,
    highlight: (code, lang) => prism.languages[lang] ? prism.highlight(code, prism.languages[lang]) : code
})

export function getStaticPaths() {
    const files = fs.readdirSync('data/posts')

    return {
        paths: files.map(filename => ({
            params: {
                slug: filename.replace(/\.md$/, '')
            }
        })),
        fallback: false
    }
}

export function getStaticProps(context) {
    const slug = context.params.slug
    const file = fs.readFileSync(`data/posts/${slug}.md`, 'utf8')
    const { data, content } = frontmatter(file)

    const html = marked(content)

    if(typeof data.date === 'object') {
        // Since Next.js can't serialize date objects.
        data.date = data.date.getTime()
    }

    return {
        props: {
            frontmatter: data,
            html
        }
    }
}
