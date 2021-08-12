import loadPosts from 'lib/loadPosts'
import Link from 'next/link'
import BlogLayout from 'components/BlogLayout'

export async function getStaticProps() {
    const posts = await loadPosts()
    return {
        props: { posts }
    }
}

export default function PostsIndex({ posts }) {
    console.log(posts)
    return (
        <BlogLayout>
            <div className="border-b-2 border-gray-200 pb-2">
                <p>
                    This is an index of the {posts.length} blog posts I’ve written.
                    These are mostly meant to be found when googling, but having a single list of them can also be nice.
                </p>
            </div>

            <div className="mt-8 space-y-8 sm:space-y-2">
                {posts.map(post => (
                    <Link href={`/posts/${post.slug}`} key={post.url}>
                        <a className="block group">
                            <div className="sm:flex sm:justify-between sm:space-x-4">
                                <p className="group-hover:underline font-medium text-gray-900 underline sm:no-underline">{post.title}</p>
                                <p className="text-gray-500">{new Date(post.date).toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </BlogLayout>
    )
}
