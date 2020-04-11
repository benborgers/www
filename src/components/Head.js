import React from "react"
import { Helmet } from "react-helmet-async"

export default ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ben Borgers" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <link rel="icon" href="https://emojicdn.elk.sh/🐙" />

      {/* for Google Search Console */}
      <meta name="google-site-verification" content="36SYJxqahg7QGGsxCBTHGhLfvekzoioL40Xo1jPgqUA" />
    </Helmet>
  )
}