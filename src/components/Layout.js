import React from "react"
import { css } from "@emotion/core"

export default ({ children }) => {
  return (
    <div
      css={css`
        max-width: 768px;
        margin: 0 auto;
        padding: 16px;
        padding-top: 48px;
        padding-bottom: 96px;

        @media (max-width: 500px) {
          padding-top: 16px;
        }
      `}
    >
      {children}
    </div>
  )
}