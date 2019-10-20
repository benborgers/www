import React from "react"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import StyleReset from "../components/StyleReset"
import Chip from "../components/Chip"

const colors = require("../utils/colors.js")

export default props => {
  const cssVars = []

  for(const name in colors[props.color]) {
    cssVars.push(`--${name}: ${colors[props.color][name]}`)
  }

  const title = props.title || "Ben Borgers"

  return (
    <>
      <Helmet>
        <link rel="icon" href={"https://emojicdn.elk.sh/" + props.emoji} />

        <title>{title}</title>
        <meta property="og:title" content={title} />

        <meta name="description" content={props.description} />
        <meta property="og:description" content={props.description} />
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