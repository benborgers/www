const fetch = require("node-fetch")
const fs = require("fs")

const createDir = dirName => {
  if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
}

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