module.exports = {
  siteMetadata: {
    siteUrl: "https://benborgers.com"
  },
  plugins: [
    "@rhysforyou/gatsby-plugin-react-helmet-async",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/invoice/*", "/invoice-paid"]
      }
    },
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        siteId: "ZWCPJCUA"
      }
    },
    "gatsby-plugin-netlify-cms"
  ]
}