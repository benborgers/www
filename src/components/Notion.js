import React from "react"
import { css } from "@emotion/core"

export default ({ raw }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: raw }}
      css={css`
        margin: 0;
        line-height: 1.5;
        font-size: 18px;

        pre {
          background-color: var(--background-tinted);
          border-radius: 8px;
          padding: 24px;
          font-size: 16px;
          overflow: scroll;
        }

        code, code * {
          font-family: var(--monospace) !important;
        }

        p code, li code {
          background-color: var(--background-tinted);
          padding: 0 4px;
          font-size: 17px;
          border-radius: 4px;
          font-weight: 500;
          display: inline-block;
        }

        a code {
          text-decoration: underline;
          text-decoration-color: var(--text-300);
        }

        img {
          width: 100%;
          display: block;
          margin: 16px 0;
          border-radius: 2px;
        }

        blockquote {
          margin: 0;
          padding-left: 16px;
          border-left: 2px solid var(--border);
          margin: 24px 0;
          font-weight: 600;
        }

        li {
          margin-bottom: 8px;
        }

        h1 {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-500);
          margin-top: 48px;
        }

        .callout {
          display: grid;
          grid-template-columns: 20px 1fr;
          grid-column-gap: 16px;
          padding: 24px;
          background-color: var(--background-tinted);
          border-radius: 8px;
          font-size: 18px;
          font-weight: 500;
        }

        .callout img {
          display: block;
          margin: 0;
          margin-top: 3px;
        }

        .callout p {
          margin: 0;
        }

        @media (max-width: 500px) {
          .callout {
            grid-template-columns: 1fr;
            grid-template-rows: 20px max-content;
            grid-row-gap: 12px;
          }

          .callout img {
            width: 20px;
          }
        }

        hr {
          border: 1px solid var(--border);
          border-radius: 99px;
          margin: 48px 0;
        }

        iframe {
          height: 320px;
          width: 100%;
          border: none;
        }
      `}
    />
  )
}