import React from "react"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import StyleReset from "../components/StyleReset"

export default () => {
  return (
    <>
      <StyleReset />

      <Helmet>
        <title>Invoice paid. Thank you!</title>
        <link rel="icon" href="https://emojicdn.elk.sh/💵" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        css={css`
          padding: 1rem;
        `}
      >

        <p
          css={css`
            margin-bottom: .5rem;
          `}
        >
          The invoice has been successfully paid. Thank you very much!
        </p>

        <p>
          You can now close this tab.
        </p>

              
      </div>
    </>
  )
}