module.exports = {
  siteMetadata: {
    siteUrl: "https://benborgers.com"
  },
  plugins: [
    "gatsby-plugin-emotion",
    "@rhysforyou/gatsby-plugin-react-helmet-async",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        siteId: "ZWCPJCUA"
      }
    }
  ]
}