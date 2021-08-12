import { useRouter } from 'next/router'
import loadPosts from 'lib/loadPosts'
import BlogLayout from 'components/BlogLayout'
import CustomHead from 'components/CustomHead'

import { Octokit } from '@octokit/core'
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function getStaticProps(context) {
    const posts = await loadPosts()
    const slug = context.params.slug
    const post = posts.find(post => post.slug === slug)

    if (!post) {
        return { notFound: true }
    }

    return {
        props: {
            post,
            html: (
                await octokit.request('POST /markdown', {
                    text: post.body
                })
            ).data
        },
        revalidate: 60 * 60 * 24 // Changes to blog posts are eventually shown, after 24 hours.
    }
}

export async function getStaticPaths() {
    const posts = await loadPosts()
    return {
        paths: posts.map(post => `/posts/${post.slug}`),
        fallback: true
    }
}

export default function Post({ post, html }) {
    const router = useRouter()

    if(router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <CustomHead title={`${post.title} - Ben Borgers`}>
                <link rel="stylesheet" href="https://unpkg.com/github-syntax-light@latest/lib/github-light.css" />
            </CustomHead>

            <BlogLayout>
                <h1 className="font-black text-3xl text-gray-900">{post.title}</h1>

                <div
                    className="prose mt-8 max-w-none md:max-w-prose"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                <div className="mt-16 text-gray-500">
                    <p>--</p>
                    <p>
                        Last updated {new Date(post.date).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </BlogLayout>
        </>
    )
}
