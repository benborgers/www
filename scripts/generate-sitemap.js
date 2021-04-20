const fs = require('fs')
const notion = require('../data/notion');

(async () => {
    const posts = fs.readdirSync('data/posts').map(filename => `/posts/${filename.replace(/\.md$/, '')}`)
    const notionPages = Object.keys(notion).map(id => `/${id}`)

    const pages = [
        ...posts,
        ...notionPages
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((path) => `
                    <url>
                        <loc>${`https://benborgers.com${path}`}</loc>
                    </url>
                `)
                .join('')
            }
        </urlset>
    `

    if(! fs.existsSync('public')) {
        fs.mkdirSync('public')
    }

    fs.writeFileSync('public/sitemap.xml', sitemap)
})()
