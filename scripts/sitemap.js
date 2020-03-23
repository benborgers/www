import fs from "fs"
import { SitemapStream, streamToPromise } from "sitemap"
import fetch from "node-fetch"

import getPosts from "../helpers/getPosts"

if(!fs.existsSync("./public")) {
  fs.mkdirSync("./public")
}

const countInstances = (fullText, phrase) => {
  return (fullText.match(new RegExp(phrase, "g")) || []).length
}

const main = async () => {
  const sitemap = new SitemapStream({ hostname: "https://benborgers.com" })

  streamToPromise(sitemap)
    .then(async file => {
      fs.writeFileSync("./public/sitemap.xml", file.toString())

      /* 
       * Check if sitemap has the same number of items as last time. 
       * If not, ask Google to re-index. 
       */

      const currentSitemap = await (await fetch("https://benborgers.com/sitemap.xml")).text()
      const currentUrls = countInstances(currentSitemap, "<url>")

      const newUrls = countInstances(file.toString(), "<url>")

      if(currentUrls !== newUrls) {
        fetch("http://www.google.com/ping?sitemap=https://benborgers.com/sitemap.xml")
          .then(res => {
            if(res.ok) {
              console.log(`[SITEMAP] Google was pinged, since the new sitemap has ${newUrls} pages compared to ${currentUrls} pages.`)
            } else {
              console.log(`[SITEMAP] Error with pinging Google.`)
            }
          })
      } else {
        console.log(`[SITEMAP] The sitemap still has ${newUrls} pages, so Google was not pinged.`)
      }
    })

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