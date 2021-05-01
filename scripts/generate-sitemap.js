const fs = require('fs');

(async () => {
    const mdxPages = fs.readdirSync('mdx').map(filename => `/${filename.replace(/\.mdx$/, '')}`)

    const pages = [
        ...mdxPages
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
