const path = require("path")
const fs = require("fs")
const fetch = require("node-fetch")
const { Feed } = require("feed")

exports.createPages = ({ actions: { createPage } }) => new Promise(resolve => {
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
        if(!post.fields.Published) {
          return console.log(`Not publishing ${post.fields.Title}`)
        }


        fetch(`https://potion.benborgers.now.sh/api/html?id=${post.id}`)
          .then(res => res.text())
          .then(html => {
            feed.addItem({
              title: post.fields.Title,
              id: post.fields.Slug,
              link: `https://benborgers.com/blog/${post.fields.Slug}/`,
              description: post.fields.Description,
              content: html,
              date: new Date(post.fields.Date.start_date)
            })

            createPage({
              path: `/blog/${post.fields.Slug}/`,
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