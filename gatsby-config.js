module.exports = {
  siteMetadata: {
    title: "Ben Borgers"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cms",
        path: __dirname + "/src/cms/"
      }
    },
    "gatsby-transformer-remark"
  ]
}
