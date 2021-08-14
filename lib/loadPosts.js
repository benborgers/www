import fs from 'fs'
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

    // This is a hack because we want the public/post-md folder to stick around
    // after the build, since it needs to exist when we revalidate.
    // It may be in two locations: public/posts-md during the build, and posts-md/
    // during subsequent regeneration.
    console.log(fs.readdirSync('.'))
    const basePostsPath = fs.existsSync('posts-md') ? 'posts-md' : 'public/posts-md'
    const localFilenames = fs.readdirSync(basePostsPath)
    const localPosts = localFilenames.map(filename => {
        const innards = fs.readFileSync(`${basePostsPath}/${filename}`, 'utf-8')
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
