module.exports = {
  siteMetadata: {
    title: "Ben Borgers",
    description: "Site description.",
    emoji: "🧪",
    siteUrl: "https://benborgers.com"
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
