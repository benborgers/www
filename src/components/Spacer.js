import React from "react"
import { css } from "@emotion/core"

export default ({ height }) => {
  return (
    <div
      css={css`
        height: ${height}px;
      `}
    />
  )
}