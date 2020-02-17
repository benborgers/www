const fs = require("fs")

const postcss = require("postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

const style = fs.readFileSync("src/style.css", "utf8")

let cssCache

const css = () => new Promise(async resolve => {
  if(cssCache) {
    return resolve(cssCache)
  }

  cssCache = (await postcss([ autoprefixer, cssnano ]).process(style, { from: "style.css" })).css
  resolve(cssCache)
})

const funComment = "yes, i did build my own static site generator just for this site"

const masterLayout = ({ title, description, ogImage, body }) => new Promise(async resolve => {
  const cleanCss = await css()

  resolve(`
    <!-- ${funComment} -->
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="icon" href="https://emojicdn.elk.sh/%F0%9F%90%99">
        <meta name="description" content="${description}">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Ben Borgers">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        ${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
        ${ogImage ? '<meta property="twitter:card" content="summary_large_image">' : ""}

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta name="google-site-verification" content="36SYJxqahg7QGGsxCBTHGhLfvekzoioL40Xo1jPgqUA">
      </head>
      <style>${cleanCss}</style>
    </html>
    
    <body>
      ${body}
    </body>
  `)
})

exports.layout = async ({ title, description, ogImage, body }) => {
  return await masterLayout({ title, description, ogImage, body })
}