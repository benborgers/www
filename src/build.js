const fs = require("fs")
const htmlMinifier = require("html-minifier").minify

const { table, html } = require("./notion")
const constants = require("./constants")
const components = require("./components")

const writeFile = (path, contents) => {
  const minifiedHtml = htmlMinifier(contents, {
    collapseWhitespace: true,
    html5: true,
  })
  fs.writeFile(`${constants.buildDir}/${path}`, minifiedHtml, () => {})
}

const main = async () => {

  /* Home page */
  const homeContents = await html(constants.pageId.home)
  const homeHtml = await components.layout({
    title: "Ben Borgers",
    description: "",
    ogImage: "https://figure.netlify.com/www-share-image",
    body: `
      <div class="page-simple">
        <p class="title">Ben Borgers</p>
        ${homeContents}
      </div>
    `
  })
  writeFile("index.html", homeHtml)


  /* Projects page */
  const projects = await table(constants.pageId.projects)
  const projectsHtml = await components.layout({
    title: "Projects - Ben Borgers",
    description: "",
    ogImage: "https://figure.netlify.com/www-share-image",
    body: `
      <div class="page-simple">
        <a href="/" class="back">← benborgers.com</a>

        <div class="page-center">
          <p class="title more-space">Projects</p>

          ${projects.map(project => `
            <div class="block">
              <a class="primary" href=${!project.fields.Link.startsWith("http") ? "https://" : ""}${project.fields.Link}>${project.fields.Name}</a>
              <p class="secondary">${project.fields.Description}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `
  })
  writeFile("projects.html", projectsHtml)

}

main()