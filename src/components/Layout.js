/* eslint-disable no-useless-escape */

import React from "react"
import { css } from "@emotion/core"

import Header from "../components/Header"

export default ({ className, children }) => {
  return (
    <div
      className={className}
      css={css`
        max-width: 768px;
        margin: 0 auto;
        padding: 16px;
        padding-top: 48px;
        padding-bottom: 96px;

        @media (max-width: 500px) {
          padding-top: 24px;
        }
      `}
    >
      <Header />

      {children}

      {process.env.NODE_ENV === "production" && (
        <>
          <script src="https://cdn.usefathom.com/3.js" site="ZWCPJCUA" spa="pushstate"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.fathom || document.write('<script src="https://z4agdnv.benborgers.com/cool.js"><\\/script>');`
            }}
          />
        </>
      )}
    </div>
  )
}