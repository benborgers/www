import fs from "fs"
import snarkdown from "snarkdown"

import "./global.js"

const path = window.location.pathname.toLowerCase().replace(/^\/blog\//, "").replace(/(\/+)$/, "").trim()

const render = (title, description, body, found=true) => {
  document.title = title

  const metaDescription = document.createElement("meta")
  metaDescription.name = "description"
  metaDescription.content = description
  $("head").appendChild(metaDescription)

  if(found) {
    const metaImage = document.createElement("meta")
    metaImage.property = "og:image"
    metaImage.content = `https://benborgers.com/posts/${path}.png`
    $("head").appendChild(metaImage)
  }

  $(".root").innerHTML = body

  prism.highlightAll()
}

const markdown = text => snarkdown(text).replace(/class="code/g, `class="code language-javascript`)

const data = {}

import postNames from "../pages/posts/*.txt"

for(const name in postNames) {
  const file = postNames[name]

  const [, frontmatter, body] = file.split("---")

  const frontmatterRows = frontmatter.split("\n")
  const meta = {}
  frontmatterRows.forEach(row => {
    const [key, value] = row.split(":").map(piece => piece.trim())
    if(key && value) {
      meta[key] = value
    }
  })

  data[name] = {
    meta,
    body: body.trim()
  }
}

if(path in data) {
  const post = data[path]

  render(post.meta.title, post.meta.description, `
    <div class="post">
      <h1 class="constrain-width">${post.meta.title}</h1>

      <div class="markdown constrain-width">${markdown(post.body)}</div>
    </div>
  `)
} else {
  render("Post not found", "This blog post could not be found.", `
    <div class="post not-found">
      <h1 class="constrain-width">Post not found</h1>
    </div>
  `, false)
}