import React from 'react'

import Layout from '../components/Layout'
import markdown from '../helpers/markdown'
import stripMarkdown from '../helpers/stripMarkdown'
import home from '../cms/home'

const index = () => {
    return (
        <Layout
            description={stripMarkdown(home.bio)}
            homepage
        >
            <div className="mb-8">
                <h1 className="font-serif font-bold text-gray-900 mb-4">Hi! I’m Ben Borgers.</h1>
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: markdown(home.bio) }}
                />
            </div>
            
            <div>
                <ul className="ml-8 list-disc space-y-2">
                    {home.bullets.map(bullet => (
                        <li key={bullet.text}>
                            <>
                                <div
                                    className="prose text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: markdown(bullet.text) }}
                                />
                                <span className="text-gray-500">{bullet.when}</span>
                            </>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default index