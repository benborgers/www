import fetch from 'node-fetch'
import matter from 'gray-matter'

export default async function loadObsidianPosts() {
    const connections = (
        await (
            await fetch('https://obby.vercel.app/api/note?name=Blog Index&token=obby_tcihXZB58s31Ux04sk6Xr')
        ).json()
    ).connections

    const posts = []

    for(const title of connections) {
        const json = await (
            await fetch(`https://obby.vercel.app/api/note?name=${title}&token=obby_tcihXZB58s31Ux04sk6Xr`)
        ).json()
        const frontmatter = matter(json.body).data
        json.slug = frontmatter.slug
        json.url = `/posts/${frontmatter.slug}`
        json.date = new Date(json.last_edited_time)
        posts.push(json)
    }

    return posts
}
