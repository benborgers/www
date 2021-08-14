import fs from 'fs'
import matter from 'gray-matter'
import _posts from '_posts'

export default async function loadPosts() {
    const connections = (
        await (
            await fetch('https://obby.vercel.app/api/note?name=Blog+Index&token=obby_tcihXZB58s31Ux04sk6Xr')
        ).json()
    ).connections

    const obsidianPosts = []

    for(const title of connections) {
        const json = await (
            await fetch(`https://obby.vercel.app/api/note?name=${title}&token=obby_tcihXZB58s31Ux04sk6Xr`)
        ).json()
        const { content, data } = matter(json.body)
        obsidianPosts.push({
            ...data,
            body: content,
            title: json.title,
            date: json.last_edited_time
        })
    }

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
