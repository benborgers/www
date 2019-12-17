/* CUSTOM BUILD SCRIPT */

const fetch = require("node-fetch")
const fs = require("fs")

/* Get share images from Figma */

const fileId = "zOqzsKxoR7hgQJxpxqV7Di"

// Get all frames

fetch(`https://api.figma.com/v1/files/${fileId}`, {
  headers: {
    "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN
  }
})
  .then(res => res.json())
  .then(json => {
    const frames = json.document.children[0].children
    const frameIds = frames.map(frame => frame.id).join(",")

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
                const dest = fs.createWriteStream(`./dist/posts/${name}.png`)
                res.body.pipe(dest)

                dest.on("finish", () => {
                  console.log(`Downloaded share image for ${name}`)
                })
              })
          }
        })
  })