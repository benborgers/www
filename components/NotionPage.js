import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import Head from '../components/Head'
import NextHead from 'next/head'

const rootNotionId = 'a81d0c09-5d6f-4310-baf6-2fc2938b89d2'

export default function NotionPage({ html, title, updatedAt, backlinks }) {
    const isIndex = title === 'Home'

    return (
        <>
            <Head
                title={isIndex ? null : title}
                description={html}
            />

            {html.includes('katex-html') && (
                <NextHead>
                    <link rel="stylesheet" href="https://unpkg.com/katex@0.13.2/dist/katex.min.css" />
                </NextHead>
            )}

            <div className={`${isIndex ? 'index' : ''} p-4 pt-6 md:pt-24 pb-24 max-w-prose mx-auto`}>
                <div className="mb-8">
                    <Link href="/">
                        <a className="text-gray-400 hover:text-gray-700 duration-150 transition-colors font-black">Ben Borgers</a>
                    </Link>
                </div>

                {!isIndex && (
                    <div className="mb-8 space-y-1.5">
                        <h1 className="font-extrabold text-3xl md:text-4xl text-gray-900">{title}</h1>
                        <p className="text-gray-500 text-sm font-medium italic">Updated <time>{new Date(updatedAt).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>
                )}

                <div
                    className="prose prose-garden"
                >
                    {ReactHtmlParser(html, {
                        transform: node => {
                            const href = node?.attribs?.href
                            if(node.type === 'tag' && node.name === 'a' && href.startsWith('/')) {
                                const text = node.children[0].data
                                return <Link href={href || '/'} key={text + href}><a>{text}</a></Link>
                            }
                        }
                    })}
                </div>

                {backlinks.length > 0 && (
                    <div className="mt-20">
                        <p className="text-gray-500">
                            This page is referenced in: {' '}
                            {backlinks.map((backlink, i) => (
                                <React.Fragment key={backlink.id}>
                                    <Link href={`/${backlink.id === rootNotionId ? '' : backlink.id}`}>
                                        <a className="underline">{backlink.title}</a>
                                    </Link>

                                    {i !== backlinks.length-1 && ', '}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

import notion from '../data/notion'

export function props(context) {
    const id = context.params?.id || rootNotionId

    console.log('context', context)
    console.log('env', process.env)

    return {
        props: notion[id]
    }
}

export function paths() {
    const ids = Object.keys(notion)

    return {
        paths: ids.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}
