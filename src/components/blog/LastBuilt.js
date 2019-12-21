import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import relativeDate from "tiny-relative-date"

export default () => {
  const query = useStaticQuery(graphql`
    query {
      site {
        buildTime
      }
    }
  `)

  const buildTime = new Date(query.site.buildTime)
  const buildTimeRelative = relativeDate(buildTime)

  return (
    <div
      css={css`
        background-color: white;
        box-shadow: 0px 2px 8px hsla(0, 0%, 0%, .1);
        border-radius: 4px;
        padding: 16px;
        background-color: var(--light-background-inky);
        max-width: max-content;

        *::selection {
          color: var(--light-text-500);
          background-color: var(--light-background);
        }
      `}
    >
      <p
        css={css`
          margin: 0;
          font-size: 16px;
          color: white;

          * {
            font-size: inherit;
            color: inherit;
          }

          strong {
            font-weight: 700;
          }
        `}
      >
        This site (benborgers.com) was last built <strong>{buildTimeRelative}</strong>.
      </p>
    </div>
  )
}