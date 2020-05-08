const path = require("path")
const fs = require("fs")
const fetch = require("node-fetch")

const notion = async (pageId, type) => {
  const res = await fetch(`https://potion-api.now.sh/api/${type}?id=${pageId}`)

  if(!res.ok) {
    throw new Error(`The Potion API response was not 200 (type: ${type}, pageId: ${pageId})`)
  }
  
  if(type === "html") {
    return await res.text()
  } else if (type === "table") {
    return await res.json()
  }
}

exports.createPages = async ({ actions: { createPage }}) => {
  const projects = await notion("accae8e6b5b8430cbbf62f0842fa18bc", "table")
  const posts = (await notion("3e22bbb109ab40138b3899cd4b31614e", "table")).filter(x => x.fields.Published === true)

  createPage({
    path: "/",
    component: path.resolve("./src/templates/index.js"),
    context: {
      projects
    }
  })

  let allHtml = {}
  const promises = []
  for(const post of posts) {
    promises.push(new Promise(async resolve => {
      const html = await notion(post.id, "html")
      allHtml[post.id] = html
      resolve()
    }))
  }

  await Promise.all(promises)

  for(const post of posts) {
    createPage({
      path: `/blog/${post.fields.Slug}`,
      component: path.resolve("./src/templates/post.js"),
      context: {
        ...post,
        html: allHtml[post.id]
      }
    })
  }
}