import matter from 'gray-matter'
import _posts from '_posts'

export default async function loadPosts() {
    const obbyResponse = await (
        await fetch('https://obby.up.railway.app/blog')
    ).json()

    const obsidianPosts = obbyResponse.map(post => ({
        slug: post.frontmatter.slug,
        body: post.body,
        title: post.title,
        date: post.last_edited_time
    }))

    const localPosts = Object.keys(_posts).map(key => {
        const innards = _posts[key]
        const { content, data } = matter(innards)
        return ({
            ...data,
            body: content,
            date: data.date.getTime(),
            slug: key
        })
    })

    return [...obsidianPosts, ...localPosts].sort((a, b) => b.date - a.date)
}
