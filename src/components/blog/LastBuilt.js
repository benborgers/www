import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const query = useStaticQuery(graphql`
    query {
      site {
        buildTime
        buildTimeRelative: buildTime(fromNow: true)
      }
    }
  `)

  const buildTime = new Date(query.site.buildTime)
  const buildTimeDate = buildTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric"
  })
  const buildTimeTime = buildTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric"
  })

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
            font-weight: 600;
          }
        `}
      >
        This site (benborgers.com) was last built <strong>{query.site.buildTimeRelative}</strong>, on <strong>{buildTimeDate} at {buildTimeTime}</strong>.
      </p>
    </div>
  )
}