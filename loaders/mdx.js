// Loads up all the MDX posts on this website.
// For totaling and search.
const fs = require('fs')
const { bundleMDX } = require('mdx-bundler')
const cleanForSearch = require('../utils/cleanForSearch')

module.exports = async () => {
    const filenames = fs.readdirSync('./mdx')

    const posts = []

    for(const filename of filenames) {
        const contents = fs.readFileSync(`./mdx/${filename}`, 'utf-8')
        const { frontmatter } = await bundleMDX(contents)
        if(! ['index.mdx', 'search.mdx'].includes(filename)) {
            posts.push({
                slug: filename.replace(/\.mdx$/, ''),
                title: frontmatter.title,
                searchContents: cleanForSearch(contents)
            })
        }
    }

    return ['mdx', posts]
}
