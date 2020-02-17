import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default ({ showName=false, light=false, lessWide=false}) => {
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

        ${light && `
          background-color: hsla(0, 0%, 100%, .8);
          backdrop-filter: blur(24px);
          box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.05);
          border-bottom: none;
        `}
      `}
    >
      <div
        css={css`
          max-width: ${lessWide ? "768px" : "844px"};
          margin: 0 auto;
          padding: 0 16px;

          display: grid;
          grid-template-columns: ${showName ? "max-content 1fr" : "1fr"};
          align-items: center;
        `}
      >
        {showName &&
          <Link
            to="/"
            css={css`
              font-weight: 600;
              color: var(--light-text-500);
              text-decoration: none;
              display: block;
            `}
          >
            Ben Borgers
          </Link>
        }

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
              name: "Blog",
              path: "/blog/"
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

                    ${light && `
                      border-bottom-color: var(--light-text-500);
                      color: var(--light-text-500);
                    `}
                  }
                }

                ${light && `
                  color: var(--light-text-100);
                  border-bottom-color: hsla(0, 0%, 0%, 0);
                `}
              `}
              activeStyle={{
                color: light ? "var(--light-text-500)" : "var(--dark-text-500)"
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