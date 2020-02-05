const path = require("path")
const fetch = require("node-fetch")

exports.createPages = ({ actions: { createPage } }) => new Promise(resolve => {
  const blogPostIndex = path.resolve("src/templates/BlogIndex.js")
  const blogPostTemplate = path.resolve("src/templates/BlogPost.js")

  fetch("https://potion.benborgers.now.sh/api/table?id=3e22bbb109ab40138b3899cd4b31614e")
    .then(res => res.json())
    .then(posts => {
      createPage({
        path: "/blog",
        component: blogPostIndex,
        context: {
          posts
        }
      })

      let i = 0

      posts.forEach(post => {
        fetch(`https://potion.benborgers.now.sh/api/html?id=${post.id}`)
          .then(res => res.text())
          .then(html => {
            createPage({
              path: `/blog/${post.fields.Slug}/`,
              component: blogPostTemplate,
              context: {
                post,
                html
              }
            })

            i++

            if(i === posts.length) resolve()
          })
      })
    })
})