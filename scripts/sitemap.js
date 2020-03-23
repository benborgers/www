import fs from "fs"
import { SitemapStream, streamToPromise } from "sitemap"

import getPosts from "../helpers/getPosts"

if(!fs.existsSync("./public")) {
  fs.mkdirSync("./public")
}

const main = async () => {
  const sitemap = new SitemapStream({ hostname: "https://benborgers.com" })

  streamToPromise(sitemap)
    .then(file => fs.writeFileSync("./public/sitemap.xml", file.toString()))

  sitemap.write({
    url: "/",
    changeFreq: "weekly",
    priority: 0.4
  })

  sitemap.write({
    url: "/projects",
    changeFreq: "weekly",
    priority: 0.6
  })

  sitemap.write({
    url: "/blog",
    changeFreq: "daily",
    priority: 0.9
  })

  const posts = await getPosts()

  posts.forEach(post => {
    sitemap.write({
      url: `/blog/${post.fields.Slug}`,
      changeFreq: "weekly",
      priority: 0.9
    })
  })

  sitemap.end()
}

main()