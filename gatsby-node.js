const fs = require("fs")
const path = require("path")

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
      createPage({
        path: "/reference/" + slug,
        component: path.resolve("./src/templates/reference.js"),
        context: {
          post: { ...post, slug } 
        }
      })
    }
  }
}