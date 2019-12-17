import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default () => {
  return (
    <header
      css={css`
        border-bottom: 1px solid hsl(0, 0%, 20%);
        position: sticky;
        top: 0;
        left: 0;
        background-color: transparent;
        backdrop-filter: blur(8px) saturate(200%);
        z-index: 9;
      `}
    >
      <div
        css={css`
          max-width: 844px;
          margin: 0 auto;
          padding: 0 16px;

          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
        `}
      >
        <nav
          css={css`
            justify-self: end;
          `}
        >
          {[
            {
              name: "Home",
              path: "/"
            },
            {
              name: "Hire Me",
              path: "/hire"
            }
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              css={css`
                text-decoration: none;
                font-size: 18px;
                margin-right: 16px;
                text-decoration: none;
                font-size: 16px;
                font-weight: 600;
                padding-bottom: 14px;
                padding-top: 16px;
                display: inline-block;
                border-bottom: 1px solid var(--dark-background);
                transition: border-color .2s, color .1s;

                :last-of-type {
                  margin-right: 0;
                }

                @media (hover: hover) {
                  :hover {
                    border-bottom-color: var(--dark-text-500);
                    color: var(--dark-text-500);
                  }
                }
              `}
              activeStyle={{
                color: "var(--dark-text-500)"
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}