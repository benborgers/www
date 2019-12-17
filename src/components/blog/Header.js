import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default () => {
  return (
    <header
      css={css`
        position: sticky;
        top: 0;
        left: 0;
        background-color: hsl(0, 0%, 100%, .8);
        padding: 16px 0;
        backdrop-filter: blur(24px);
        box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.05);
      `}
    >
      <div
        css={css`
          max-width: 768px;
          margin: 0 auto;
          padding: 0 16px;

          display: grid;
          grid-template-columns: max-content 1fr;
        `}
      >
        <Link
          to="/"
          css={css`
            text-decoration: none;
          `}
        > 
          <p
            css={css`
              font-weight: 600;
              color: var(--light-text-500);
            `}
          >
            Ben Borgers’ Blog
          </p>
        </Link>
      </div>
    </header>
  )
}