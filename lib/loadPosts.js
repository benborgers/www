import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

    const postsDir = path.resolve('posts-md')
    const localFilenames = fs.readdirSync(postsDir)
    const localPosts = localFilenames.map(filename => {
        const innards = fs.readFileSync(`posts-md/${filename}`, 'utf-8')
        const { content, data } = matter(innards)
        return ({
            ...data,
            body: content,
            date: data.date.getTime(),
            slug: filename.replace(/\.md$/, '')
        })
    })

    return [...obsidianPosts, ...localPosts].sort((a, b) => b.date - a.date)
}
