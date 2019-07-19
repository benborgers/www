import React from "react"
import { css } from "@emotion/core"

export default props => {
  return (
    <p
      css={css`
        font-size: 1.2rem;
        color: ${props.type === "primary" ? "var(--500)" : props.type === "secondary" ? "var(--300)": ""};
        font-weight: ${props.type === "primary" ? "500" : props.type === "secondary" ? "400" : ""};
        margin-bottom: .5rem;
        line-height: 1.4;

        ${props.style}
      `}
    >
      {props.children}
    </p>
  )
}