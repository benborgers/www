const fs = require('fs')
const path = require('path')

const markdown = require('./src/helpers/markdown')

exports.createPages = ({ actions: { createPage } }) => {
    const blogPostTemplate = path.resolve('src/templates/blog-post.js')
    
    fs.readdirSync('src/cms/blog').forEach(filename => {
        const file = fs.readFileSync('src/cms/blog/' + filename)
        const json = JSON.parse(file)
        
        if(json.published) {
            createPage({
                path: `/blog/${json.slug}/`,
                component: blogPostTemplate,
                context: {
                    ...json,
                    bodyHtml: markdown(json.body)
                }
            })
        }
    })
}
