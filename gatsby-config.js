module.exports = {
  siteMetadata: {
    siteUrl: "https://benborgers.com"
  },
  plugins: [
    "@rhysforyou/gatsby-plugin-react-helmet-async",
    "gatsby-plugin-emotion",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cache",
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        siteId: "ZWCPJCUA"
      }
    }
  ]
}