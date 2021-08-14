const fs = require('fs')

const postFilenames = fs.readdirSync('_posts')

const obj = {}

postFilenames.forEach(filename => {
    obj[filename.replace(/\.md$/, '')] = fs.readFileSync(`_posts/${filename}`, 'utf8')
})

fs.writeFileSync('_posts.json', JSON.stringify(obj, null, 2))
