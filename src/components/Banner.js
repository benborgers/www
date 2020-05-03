import React from "react"
import { css, Global } from "@emotion/core"

export default () => {
  return (
    <>
      <Global
        styles={css`
          header {
            margin-top: 32px;
          }
        `}
      />

      <a
        href="https://underline.email"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          css={css`
            background-color: var(--text-500);
            padding: 8px 16px;
            border-radius: 8px;

            p, p * {
              line-height: 1.6 !important;
              color: white;
              margin: 0;
              text-align: center;
              font-size: 16px !important;
            }

            .underline {
              text-decoration: underline;
              text-decoration-color: hsl(0deg 0% 50%);
            }
          `}
        >
          <p>
            I'm building a super simple email list app. <br />Sign up during beta and get 2,000 free emails per month, for life.
            {" "}
            <span className="underline">Check it out.</span>
          </p>
        </div>
      </a>
    </>
  )
}