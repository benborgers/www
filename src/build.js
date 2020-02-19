const fs = require("fs")
const htmlMinifier = require("html-minifier").minify
const { SitemapStream, streamToPromise } = require("sitemap")

const { table, html } = require("./notion")
const constants = require("./constants")
const components = require("./components")

const writeFile = (path, contents) => {
  const minifiedHtml = htmlMinifier(contents, {
    collapseWhitespace: true,
    html5: true,
    minifyJS: true
  })
  fs.writeFile(`${constants.buildDir}/${path}`, minifiedHtml, () => {})
}

const main = async () => {

  /* Set up sitemap */
  const sitemap = new SitemapStream({ hostname: "https://benborgers.com" })

  streamToPromise(sitemap)
    .then(file => writeFile("sitemap.xml", file.toString()))

  sitemap.write({
    url: "/",
    changefreq: "weekly",
    priority: 0.4
  })

  sitemap.write({
    url: "/projects",
    changefreq: "weekly",
    priority: 0.6
  })

  sitemap.write({
    url: "/blog",
    changefreq: "daily",
    priority: 0.9
  })
  

  /* Home page */
  const homeContents = await html(constants.pageId.home)
  const homeHtml = await components.layout({
    title: "Ben Borgers",
    description: "I'm a 17 year old coder from Boston, MA. I interned at IBM during the summer in 2019 and am returning for the summer of 2020. I work on a lot of personal projects, and sometimes write on my blog.",
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
    description: "I'm a 17 year old coder from Boston, MA. This is a list of my personal projects, things I've built over the last couple years.",
    ogImage: "https://figure.netlify.com/www-share-image",
    body: `
      <div class="page-simple">
        <a href="/" class="back">&larr; benborgers.com</a>

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
    description: "I'm a 17 year old coder from Boston, MA. These are my blog posts on JavaScript and Node.js, React, Gatsby, and more.",
    ogImage: "https://figure.netlify.com/blog-share-image",
    body: `
      <div class="page-simple">
        <a href="/" class="back">&larr; benborgers.com</a>

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

  let postsProcessed = 0

  publishedPosts.forEach(async post => {
    const postHtml = await html(post.id)

    const clean = text => text.replace(/"/g, "&quot;")
    const title = clean(post.fields.Title)
    const description = clean(post.fields.Description)

    sitemap.write({
      url: `/blog/${post.fields.Slug}`,
      changefreq: "weekly",
      priority: 0.7
    })

    const fullHtml = await components.layout({
      title: title,
      description: description,
      body: `
        <div class="page-simple">
          <a href="/blog" class="back">&larr; benborgers.com/blog</a>

          <div class="page-center wider">
            <p class="title center">${title}</p>

            <div class="blog-content">
              ${postHtml.replace(/\t/g, "&nbsp;&nbsp;")}
            </div>
          </div>
        </div>

        <script src="/static/highlight.js"></script>
        <script>
          hljs.initHighlightingOnLoad()
        </script>
        <link rel="stylesheet" href="/static/highlight.css">
      `
    })
    writeFile(`blog/${post.fields.Slug}.html`, fullHtml)


    postsProcessed++

    if(postsProcessed === publishedPosts.length) {
      sitemap.end()
    }
  })

}

main()