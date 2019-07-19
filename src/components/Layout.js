import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"

import StyleReset from "../components/StyleReset"
import Chip from "../components/Chip"

const colors = require("../utils/colors.js")

export default props => {
  const query = useStaticQuery(graphql`
    {
      emoji: site {
        siteMetadata {
          emoji
        }
      }
    }
  `)

  const cssVars = []

  for(const name in colors[props.color]) {
    cssVars.push(`--${name}: ${colors[props.color][name]}`)
  }

  return (
    <>
      <Helmet>
        <title>{props.title || "Ben Borgers"}</title>
        <link rel="shortcut icon" href={"https://emojicdn.elk.sh/" + (props.emoji || query.emoji.siteMetadata.emoji)} />
      </Helmet>

      <StyleReset />

      <div
        css={css`
          max-width: 30rem;
          margin: 0 auto;
          margin-top: 5rem;
          padding: 1.5rem;
          color: var(--500);

          *::selection {
            color: var(--500);
            background-color: var(--100);
          }

          ${cssVars.join(";") + ";"}

          @media (max-width: 30rem) {
            margin-top: 0;
          }
        `}
      >
        {props.chip !== undefined ? <Chip text={props.chip} /> : ""}

        {props.children}
      </div>
    </>
  )
}