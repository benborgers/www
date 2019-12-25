const fetch = require("node-fetch")
const fs = require("fs")

const createDir = dirName => {
  if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
}

exports.onCreatePage = ({ page }) => new Promise(resolve => {
  const doNotCrosspost = ["emojicdn",
                          "gatsby-last-built"]

  if(page.path.startsWith("/blog/") && page.context.frontmatter) {
    const frontmatter = page.context.frontmatter
  
    const title = frontmatter.title
    const description = frontmatter.description
    
    const id = page.path.match(/\/blog\/(?<id>.*)\//).groups.id
    
    const body = fs.readFileSync(`./src/pages/blog/${id}.mdx`, "utf8").split("---")[2]
    const preBody = "\n*This article was originally posted on [my personal blog](https://benborgers.com/blog).*\n\n"
    const bodyMarkdown = `---
    title: ${title}
    description: ${description}
    cover_image: https://benborgers.com/assets/${id}.png
    published: true
    canonical_url: https://benborgers.com/blog/${id}/
    ---
    ` + preBody + body

    if(doNotCrosspost.includes(id)) {
      console.log(`DEV: skipping ${id}`)
      resolve()
      return
    }

    fetch("https://dev.to/api/articles/me", {
      headers: {
        "api-key": process.env.DEV_TOKEN
      }
    })
      .then(res => res.json())
      .then(articles => {
        const existingArticle = articles.find(a => a.title === title)

        const fetchOptions = {
          headers: {
            "api-key": process.env.DEV_TOKEN,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            article: {
              body_markdown: bodyMarkdown
            }
          })
        }

        if(!existingArticle) {
          fetch("https://dev.to/api/articles", { ...fetchOptions, method: "POST" })
            .then(res => res.json())
            .then(json => {
              if(json.error) {
                console.log(`DEV: error crossposting ${id}`, json)
              } else {
                console.log(`DEV: crossposted ${json.url}`)
              }
              resolve()
            })
        } else {
          fetch(`https://dev.to/api/articles/${existingArticle.id}`, { ...fetchOptions, method: "PUT" })
            .then(res => res.json())
            .then(json => {
              if(json.error) {
                console.log(`DEV: error updating ${id}`, json)
              } else {
                console.log(`DEV: updated ${json.url}`)
              }

              resolve()
            })
        }
      })
  } else {
    resolve()
  }
})

exports.onPostBuild = () => new Promise(resolve => {
  /* Get share images from Figma */

  const fileId = "zOqzsKxoR7hgQJxpxqV7Di"

  fetch(`https://api.figma.com/v1/files/${fileId}`, {
    headers: {
      "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN
    }
  })
    .then(res => res.json())
    .then(json => {
      const frames = json.document.children[0].children
      const frameIds = frames.map(frame => frame.id).join(",")

      const framesToGet = frames.length
      let framesGotten = 0

      createDir("./public/assets")

      fetch(`https://api.figma.com/v1/images/${fileId}?ids=${frameIds}`, {
        headers: {
          "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN
        }
      })
        .then(res => res.json())
        .then(json => {
          for(const id in json.images) {
            const name = frames.find(frame => frame.id === id).name
            const imageUrl = json.images[id]

            fetch(imageUrl)
              .then(res => {
                const dest = fs.createWriteStream(`./public/assets/${name}.png`)
                res.body.pipe(dest)

                dest.on("finish", () => {
                  framesGotten++
                  console.log(`Downloaded share image for ${name}`)

                  if(framesGotten === framesToGet) {
                    resolve()
                  }
                })
              })
          }
        })
  }) 
})