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

      <div
        css={css`
          max-width: 40rem;
          margin: 0 auto;
          padding: 1.5rem;
          padding-top: 4rem;

          @media (max-width: 43rem) {
            padding-top: 1.5rem;
          }
        `}
      >
        {props.children}
      </div>
    </React.Fragment>
  )
}