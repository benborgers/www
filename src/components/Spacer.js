import React from "react"
import { css } from "@emotion/core"

export default props => {
  return (
    <div
      css={css`
        height: ${props.height}rem;
      `}
    />
  )
}