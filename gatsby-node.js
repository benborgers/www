const fs = require("fs")
const path = require("path")
const fetch = require("node-fetch")

const publishedReferences = []

exports.createPages = async ({ actions }) => {
  const { createPage } = actions


  /* INVOICING */

  const invoiceFiles = fs.readdirSync("./src/cms/invoices")

  for(const file of invoiceFiles) {
    const invoice = JSON.parse(fs.readFileSync("./src/cms/invoices/" + file))

    createPage({
      path: "/invoice/" + invoice.id,
      component: path.resolve("./src/templates/invoice.js"),
      context: {
        invoice
      }
    })
  }


  /* REFERENCE */

  const referenceFiles = fs.readdirSync("./src/cms/reference")

  for(const file of referenceFiles) {
    const post = JSON.parse(fs.readFileSync("./src/cms/reference/" + file))

    const slug = file.slice(0, -5) // remove the .json ending, so 5 characters

    if(post.published === "yes") {
      const postPlus = { ...post, slug }

      publishedReferences.push(postPlus)

      createPage({
        path: "/reference/" + slug,
        component: path.resolve("./src/templates/reference.js"),
        context: {
          post: postPlus
        }
      })
    }
  }


  createPage({
    path: "/references",
    component: path.resolve("./src/templates/references.js"),
    context: {
      list: publishedReferences
    }
  })
}

exports.onPostBuild = () => {
  const postsToGet = publishedReferences.length
  let postsGot = 0

  const clean = text => encodeURIComponent(text)

  return new Promise(resolve => {
     /* Fetch share images for reference pages */

    for(const post of publishedReferences) {
      const html = clean(`
        <main>
          <div>
            <p>${post.title}</p>
          </div>
        </main>
      `)
  
      const css = clean(`
        @import url("https://rsms.me/inter/inter.css");

        * {
          margin: 0;
          padding: 0;
        }

        main {
          height: 100vh;
          display: grid;
          place-items: center center;
        }

        div {
          margin: 0 96px;
          margin-right: 136px;
        }

        p {
          font-family: "Inter", sans-serif;
          color: hsl(200, 29%, 16%);
          font-size: 40px;
          font-weight: 600;
          border-left: 8px solid hsl(53, 100%, 50%);
          padding-left: 32px;
        }
      `)
  
      fetch(`https://og-image.glitch.me/?html=${html}&css=${css}`)
        .then(res => {
          const dest = fs.createWriteStream(`./public/reference/${post.slug}.png`)
  
          res.body.pipe(dest)

          dest.on("finish", () => {
            postsGot++
            if(postsGot === postsToGet) {
              resolve(true)
            }
          })
        })
    }

  })
}