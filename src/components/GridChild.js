import React from "react"
import { css } from "@emotion/core"

export default ({ heading, children }) => {
  return (
    <>
      <h1
        css={css`
          mix-blend-mode: lighten;
          background: var(--dark-background);
          position: relative;
          color: white;
          height: max-content;
          font-size: 24px;
          font-weight: 600;

          ::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            mix-blend-mode: multiply;
            pointer-events: none;
            background: linear-gradient(180deg, hsl(190, 82%, 66%), hsl(190, 60%, 40%));
          }

          @media (max-width: 844px) {
            font-size: 20px;
            font-weight: 500;
            margin-top: 16px;
          }

          :first-of-type {
            margin-top: 0;
          }
        `}
      >
        {heading}
      </h1>

      <div
        css={css`
          * {
            font-size: 24px;
            font-weight: 600;
            line-height: 1.3;
          }

          li {
            list-style-type: none;
            margin-bottom: 16px;
          }

          a {
            text-decoration-color: var(--dark-underline);
            transition: color .2s;
          }

          a:hover {
            color: var(--dark-text-500);
          }

          @media (max-width: 844px) {
            * {
              font-size: 20px;
              font-weight: 500;
            }
          }
        `}
      >
        {children}
      </div>
    </>
  )
}