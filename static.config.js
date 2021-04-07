import path from 'path'
import fs from 'fs'
import frontmatter from '@github-docs/frontmatter'
import marked from 'marked'
import prism from 'prismjs'
import { NotionDoc } from '@benborgers/notion-api'

marked.setOptions({
    smartypants: true,
    highlight: (code, lang) => prism.languages[lang] ? prism.highlight(code, prism.languages[lang]) : code
})

const notionData = {}
const loadNotionData = async id => {
    const doc = new NotionDoc(id)
    doc.downgradeHeadings = true
    let html = await doc.html()
    const title = await doc.title()
    const updatedAt = await doc.updatedAt()

    const linksTo = []

    console.log(`Fetched from Notion: ${title}`)

    if(html.includes('Untitled</a>')) {
        console.warn(`Page linked on ${title} is not public.`)
        process.exit(1)
    }

    const links = (html.match(/data-page-id="(.+?)"/g) || []).map(str => str.replace(/^data-page-id="|"$/g, ''))

    html = html.replace(/data-page-id="/g, 'href="/')

    for(const link of links) {
        linksTo.push(link)
        if(! notionData[link]) {
            await loadNotionData(link)
        }
    }

    notionData[id] = {
        html,
        title,
        updatedAt,
        linksTo
    }
}

export default {
    getRoutes: async () => {
        const routes = []

        /* Legacy blog posts */

        const files = fs.readdirSync('./posts')
        for(const filename of files) {
            const fileContents = fs.readFileSync(`./posts/${filename}`, 'utf8')
            const { data, content } = frontmatter(fileContents)

            const html = marked(content)

            routes.push({
                path: `posts/${filename.replace(/\.md$/, '')}`,
                template: 'src/containers/Post',
                getData: () => ({ frontmatter: data, html })
            })
        }


        /* Notion */
        const rootNotionId = 'a81d0c09-5d6f-4310-baf6-2fc2938b89d2'
        await loadNotionData(rootNotionId)

        for(const id in notionData) {
            const page = notionData[id]
            const slug = id === rootNotionId ? '/' : id

            const backlinks = []
            for(const scanId in notionData) {
                if(notionData[scanId].linksTo.includes(id)) {
                    backlinks.push({
                        id: scanId,
                        title: notionData[scanId].title
                    })
                }
            }

            routes.push({
                path: slug,
                template: 'src/containers/Notion',
                getData: () => ({ ...page, backlinks: backlinks.reverse() })
            })
        }

        return routes
    },
    plugins: [
        [
            require.resolve('react-static-plugin-source-filesystem'),
            {
                location: path.resolve('./src/pages'),
            },
        ],
        require.resolve('react-static-plugin-reach-router'),
        require.resolve('react-static-plugin-sitemap'),
    ],
}
