import React from "react"
import { css } from "@emotion/core"
import { PenTool } from "react-feather"

export default () => {
  return (
    <footer
      css={css`
        border-radius: 8px;
        margin-top: 96px;
      `}
    >
      <div
        css={css`
          margin: 0 auto;
          max-width: max-content;
        `}
      >
        <PenTool color="var(--text-500)" />
      </div>

      <p
        css={css`
          margin: 0 auto;
          margin-top: 16px;
          max-width: 500px;
          font-size: 20px;
          text-align: center;
          line-height: 1.5;
          font-weight: 500;
        `}
      >
        Written by <a href="https://twitter.com/benborgers">Ben Borgers</a>. If you spot a mistake or have a question, don't hesitate to <a href="mailto:borgersbenjamin@gmail.com">email</a> me!
      </p>
    </footer>
  )
}