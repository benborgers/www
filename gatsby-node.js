const fs = require("fs")
const path = require("path")

const publishedReferences = []

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const referenceFiles = fs.readdirSync("./src/cms/reference")

  for(const file of referenceFiles) {
    const post = JSON.parse(fs.readFileSync("./src/cms/reference/" + file))

    const slug = file.slice(0, -5) // remove the .json ending, so 5 characters

    if(post.published === "yes") {
      const postPlus = { ...post, slug }

      publishedReferences.push(postPlus)

      createPage({
        path: "/reference/" + slug + "/",
        component: path.resolve("./src/templates/reference.js"),
        context: {
          post: postPlus
        }
      })
    }
  }


  createPage({
    path: "/references/",
    component: path.resolve("./src/templates/references.js"),
    context: {
      list: publishedReferences
    }
  })
}