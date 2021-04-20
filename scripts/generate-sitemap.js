const fs = require('fs');

(async () => {
    const posts = fs.readdirSync('data/posts').map(filename => `/posts/${filename.replace(/\.md$/, '')}`)

    const pages = [
        ...posts
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

    fs.writeFileSync('public/sitemap.xml', sitemap)
})()
