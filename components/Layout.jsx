import { useEffect } from 'react'
import Link from 'next/link'
import Wrapper from './Wrapper'
import Head from './Head'

export default function Layout({ MDXComponent, frontmatter }) {
    return (
        <>
            <Head title={frontmatter.title} description={frontmatter.description} />

            <Wrapper>
                <div className="pt-4 sm:pt-6 max-w-prose mx-auto">
                    <div className="mb-12 sm:mb-24">
                        <Link href="/">
                            <a className="flex justify-start">
                                <div className="flex items-center space-x-2 bg-rose-50 px-3 py-0.25 rounded-full">
                                    <img src="https://emojicdn.elk.sh/👋" alt="" className="h-4" />
                                    <span className="text-rose-600 font-medium">Ben Borgers</span>
                                </div>
                            </a>
                        </Link>
                    </div>

                    {frontmatter.title && (
                        <div className="mb-12 space-y-2">
                            <h1 className="text-gray-900 font-black text-3xl">{frontmatter.title}</h1>
                            {frontmatter.date && (
                                <p className="text-gray-400">
                                    Updated {new Date(frontmatter.date).toLocaleString('en-US', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    )}

                    <div className={frontmatter.noProse === true ? '' : 'prose prose-rose'}>
                        <MDXComponent />
                    </div>
                </div>
            </Wrapper>
        </>
    )
}
