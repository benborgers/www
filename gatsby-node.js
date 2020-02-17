const path = require("path")
const fs = require("fs")
const fetch = require("node-fetch")
const { Feed } = require("feed")

exports.createPages = ({ actions: { createPage } }) => new Promise(resolve => {
  fetch("https://potion-api.now.sh/api/html?id=4d529b5031244b57a2dc0dbea5b096f0")
    .then(res => res.text())
    .then(text => {
      createPage({
        path: "/",
        component: path.resolve("src/templates/Index.js"),
        context: {
          projects: text
        }
      })
    })


  const feed = new Feed({
    title: "Ben Borgers’ Blog",
    description: "Articles and notes on React, Gatsby, Node, and more.",
    id: "https://benborgers.com/blog/",
    link: "https://benborgers.com/blog/",
    language: "en",
    image: "https://figure.netlify.com/www-share-image",
    generator: "Ben Borgers",
    author: {
      name: "Ben Borgers",
      email: "borgersbenjamin@gmail.com",
      link: "https://benborgers.com"
    }
  })


  const blogPostIndex = path.resolve("src/templates/BlogIndex.js")
  const blogPostTemplate = path.resolve("src/templates/BlogPost.js")

  fetch("https://potion-api.now.sh/api/table?id=3e22bbb109ab40138b3899cd4b31614e")
    .then(res => res.json())
    .then(rawPosts => {
      const posts = rawPosts.filter(post => post.fields.Published === true)

      createPage({
        path: "/blog",
        component: blogPostIndex,
        context: {
          posts: posts.reverse()
        }
      })

      let i = 0

      posts.forEach(post => {
        const slug = post.fields.Slug.trim()

        fetch(`https://potion-api.now.sh/api/html?id=${post.id}`)
          .then(res => res.text())
          .then(html => {
            feed.addItem({
              title: post.fields.Title,
              id: slug,
              link: `https://benborgers.com/blog/${slug}/`,
              description: post.fields.Description,
              content: html,
              date: new Date(post.fields.Date.start_date)
            })

            createPage({
              path: `/blog/${slug}/`,
              component: blogPostTemplate,
              context: {
                post,
                html
              }
            })

            i++

            if(i === posts.length) {
              fs.writeFileSync("./public/feed.xml", feed.atom1())
              resolve()
            }
          })
      })
    })
})