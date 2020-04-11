import React from "react"
import { css } from "@emotion/core"

import config from "../../config"

export default ({ children }) => {
  return (
    <div
      css={css`
        border-radius: 8px;

        display: grid;
        > * {
          grid-row: 1;
          grid-column: 1;
          align-self: end;
        }
        
        background-image: url("https://source.unsplash.com/${config.image}");
        background-size: cover;
        background-position: center;
      `}
    >
      <div
        css={css`
          padding: 24px;
          background-color: hsla(0, 0%, 100%, 0.8);
          backdrop-filter: blur(6px);
          margin-top: 256px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        `}
      >
        {children}
      </div>
    </div>
  )
}