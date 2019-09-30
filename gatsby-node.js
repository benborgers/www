const fs = require("fs")
const path = require("path")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const invoiceFiles = fs.readdirSync("./src/cms/invoices")

  for(const file of invoiceFiles) {
    const invoice = JSON.parse(fs.readFileSync("./src/cms/invoices/" + file))

    createPage({
      path: "/invoice/" + invoice.id,
      component: path.resolve("src/templates/invoice.js"),
      context: {
        invoice
      }
    })
  }
}