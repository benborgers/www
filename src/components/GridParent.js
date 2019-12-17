import React from "react"
import { css } from "@emotion/core"

export default ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 32px;
        grid-row-gap: 64px;
        max-width: 844px;
        margin: 0 auto;

        @media (max-width: 844px) {
          grid-template-columns: 1fr;
          grid-row-gap: 16px;
        }
      `}
    >
      {children}
    </div>
  )
}