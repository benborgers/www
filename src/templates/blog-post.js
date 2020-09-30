import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import markdown from '../helpers/markdown'

import hljs from 'highlight.js'
import 'highlight.js/styles/dracula.css'

const BlogPost = ({ pageContext }) => {
    useEffect(() => {
        hljs.initHighlighting()
    }, [])
    
    return (
        <Layout
            title={pageContext.title}
            description={pageContext.description}
        >
            <div className="mt-8 mb-4 space-y-1">
                <h1 className="font-serif font-bold text-2xl text-gray-900 leading-snug">{pageContext.title}</h1>
                <div>
                    <time itemProp="dateModified" className="text-gray-500 font-semibold">{new Date(pageContext.date).toLocaleString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
            </div>
            
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: markdown(pageContext.body) }}
            />
            
            <div className="mt-16 p-4 bg-gray-100 rounded shadow-inner">
                <p className="text-gray-900 text-center">
                    Feel free to email me with questions or replies! <a href="mailto:benborgers@hey.com" className="text-teal-700 underline">benborgers@hey.com</a>
                </p>
            </div>
        </Layout>
    )
}

export default BlogPost