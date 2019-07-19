import React from "react"
import { css } from "@emotion/core"

export default props => {
  return (
    <div
      css={css`
        background-color: var(--100);
        max-width: max-content;
        padding: .5rem 1rem;
        border-radius: 99rem;
        margin-left: -.5rem;
        margin-bottom: 1rem;

        * {
          font-weight: 500;
        }
      `}
    >
      <span
        css={css`
          color: var(--300);
          display: inline-block;
          margin-right: ${props.text ? ".3rem" : "0"};
          font-weight: 600;
        `}
      >
        /
      </span>

      <span>
        {props.text}
      </span>
    </div>
  )
}