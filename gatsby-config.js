module.exports = {
  siteMetadata: {
    siteUrl: "https://benborgers.com"
  },
  plugins: [
    "@rhysforyou/gatsby-plugin-react-helmet-async",
    "gatsby-plugin-emotion",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/": [
            "Basic-Auth: someuser:somepassword anotheruser:anotherpassword"
          ]
        }
      }
    },
    "gatsby-plugin-netlify-cache",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          blog: require.resolve("./src/templates/BlogPost.js")
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/pages/blog/`
      }
    },
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        siteId: "ZWCPJCUA"
      }
    }
  ]
}