import React from "react"
import { css } from "@emotion/core"

import Header from "../components/Header"

export default ({ className, children }) => {
  return (
    <div
      className={className}
      css={css`
        max-width: 768px;
        margin: 0 auto;
        padding: 16px;
        padding-top: 48px;
        padding-bottom: 96px;

        @media (max-width: 500px) {
          padding-top: 24px;
        }
      `}
    >
      <Header />

      {children}
    </div>
  )
}