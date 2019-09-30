module.exports = {
  siteMetadata: {
    siteUrl: "https://benborgers.com"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/invoice/*"]
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