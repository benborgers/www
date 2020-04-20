import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default () => {
  return (
    <header
      css={css`
        margin-bottom: 32px;

        @media (max-width: 600px) {
          margin-bottom: 24px;
        }
      `}
    >
      
      <Link
        to="/"
        css={css`
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          display: block;
          text-decoration: none;
          letter-spacing: -0.3px;
          max-width: max-content;
          padding: 5px 16px;
          color: white;
          position: relative;
          line-height: 1;

          ::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            background: var(--text-500);
            transform: skew(-20deg);
            z-index: -1;
            border-radius: 3px;
            transition: background-color 0.2s;
          }

          @media (hover: hover) {
            :hover::after {
              background-color: var(--text-accent);
            }
          }
        `}
      >
        Ben Borgers
      </Link>
    </header>
  )
}