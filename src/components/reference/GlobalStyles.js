import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import "normalize.css"

export default () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>
      
      <Global
        styles={css`
          :root {
            --text-black: hsl(200, 29%, 16%);
            --text-gray: hsl(200, 20%, 35%);
            --text-lightgray: hsl(200, 10%, 55%);
            --text-background-light: hsl(200, 30%, 93%);

            --accent: hsl(53, 100%, 50%);

            --background: hsl(0, 0%, 100%);
          }

          * {
            font-family: "Inter", sans-serif;
          }

          body {
            background-color: var(--background);
          }

          ::selection {
            color: var(--text-black);
            background-color: var(--accent);
          }

          a {
            color: inherit;
            text-decoration: underline;
            transition: text-decoration-color .2s;
          }

          a:hover {
            text-decoration-color: var(--accent);
          }
        `}
      />
    </>
  )
}