import React from 'react'
import snarkdown from 'snarkdown'

import Layout from '../components/Layout'
import home from '../cms/home'

const index = () => {
    return (
        <Layout homepage>
            <div class="mb-8">
                <h1 className="font-serif font-bold text-gray-900 mb-4">Hi! I’m Ben Borgers.</h1>
                <div
                    className="prose prose-mini"
                    dangerouslySetInnerHTML={{ __html: snarkdown(home.bio) }}
                />
            </div>
            
            <div>
                <ul className="ml-8 list-disc space-y-2">
                    {home.bullets.map(bullet => (
                        <li key={bullet.text}>
                            <>
                                <p
                                    className="prose text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: snarkdown(bullet.text) }}
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