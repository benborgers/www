import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from '../components/Router'

export default function Post() {
    const { frontmatter: { title, date }, html } = useRouteData()

    return (
        <>
            {html.includes('<pre><code') && <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.6.0/themes/prism-dracula.css" />}

            <div>
                <div class="p-4 sm:pt-6 pb-24 max-w-prose mx-auto">
                    <div class="flex mb-12 sm:mb-24">
                        <div>
                            <div class="w-5 h-5 bg-gradient-to-tr from-red-300 to-blue-400 rounded-full"></div>
                            <Link to="/">
                                <div class="py-1 px-2 rounded-lg bg-white border border-gray-200 shadow-lg -mt-3 ml-2">
                                    <p class="font-semibold text-gray-700">Ben&nbsp;Borgers</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div class="mb-8">
                        <h1 class="text-3xl font-black text-gray-800 mb-2 leading-snug">{title}</h1>
                        <p class="text-gray-400">Updated <time>{new Date(date).toLocaleString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric', day: 'numeric' })}</time></p>
                    </div>
                    <div
                        class="prose prose-posts"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <div class="pt-4 mt-16 border-t-2 border-gray-200">
                        <p class="text-gray-500">
                            Was anything confusing, outdated, or incorrect? Please let me know!
                            <a href="mailto:benborgers@hey.com" class="underline">benborgers@hey.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
