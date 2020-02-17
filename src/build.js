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

  const dev = !process.env.NETLIFY

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
          <p class="title center">Projects</p>

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


  /* Blog posts */
  const allPosts = await table(constants.pageId.blog)
  const publishedPosts = allPosts.filter(post => post.fields.Published === true)

  const blogIndexHtml = await components.layout({
    title: "Blog - Ben Borgers",
    description: "",
    body: `
      <div class="page-simple">
        <a href="/" class="back">← benborgers.com</a>

        <div class="page-center">
          <p class="title center">Blog</p>

          ${publishedPosts.reverse().map(post => `
            <div class="block">
              <a class="primary" href="/blog/${post.fields.Slug}">${post.fields.Title}</a>
            </div>
          `).join("")}
        </div>
      </div>
    `
  })
  writeFile("blog.html", blogIndexHtml)

  publishedPosts.forEach(async post => {
    const postHtml = await html(post.id)

    const clean = text => text.replace(/"/g, "&quot;")
    const title = clean(post.fields.Title)
    const description = clean(post.fields.Description)

    const fullHtml = await components.layout({
      title: title,
      description: description,
      body: `
        <div class="page-simple">
          <a href="/blog" class="back">← benborgers.com/blog</a>

          <div class="page-center wider">
            <p class="title center">${title}</p>

            <div class="blog-content">
              ${postHtml.replace(/\t/g, "&nbsp;&nbsp;")}
            </div>
          </div>
        </div>

        <script src="${dev ? `../static/highlight.js` : `/static/highlight.js`}"></script>
        <script>
          hljs.initHighlightingOnLoad()
        </script>
        <link rel="stylesheet" href="${dev ? `../static/highlight.css` : `/static/highlight.css`}">
      `
    })
    writeFile(`blog/${post.fields.Slug}.html`, fullHtml)
  })

}

main()