import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"

import GlobalStyles from "../GlobalStyles"

export default props => {
  const query = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          emoji
        }
      }
    }
  `)

  const { title, description, emoji} = query.site.siteMetadata

  return (
    <React.Fragment>
      <Helmet>
        <link rel="shortcut icon" href={"https://emojicdn.elk.sh/" + emoji} />

        <title>{title}</title>
        <meta property="og:title" content={title} />

        <meta name="description" property="og:description" content={description} />
      </Helmet>

      <GlobalStyles />

      <div>
        {props.children}
      </div>
    </React.Fragment>
  )
}
