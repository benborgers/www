import React from "react"
import { css } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Header from "./Header"

export default ({ title, description, children }) => {
  return (
    <>
      <Head
        title={title}
        description={description}
        shareImage="https://figure.netlify.com/www-share-image"
      />

      <GlobalStyles />

      <Header />

      <main
        css={css`
          max-width: 844px;
          margin: 0 auto;
          margin-top: 96px;
          margin-bottom: 128px;
          padding: 0 16px;

          @media (max-width: 844px) {
            margin-top: 24px;
          }

          --background: var(--dark-background);
          --selection-background: hsl(190, 82%, 66%);
          --selection-text: white;
        `}
      >
        {children}
      </main>
    </>
  )
}