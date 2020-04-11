import React from "react"
import { Helmet } from "react-helmet-async"
import { css, Global } from "@emotion/core"

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
            --text-500: hsl(216, 100%, 5%);
            --text-300: hsl(216, 20%, 30%);
            --text-accent: hsl(216, 100%, 60%);

            --monospace: "Roboto Mono", monospace;

            --background: white;
            --background-tinted: hsl(216, 20%, 96%);
            --background-selection: hsl(216, 100%, 60%);

            --border: hsl(216, 20%, 90%);
          }

          * {
            font-family: "Inter", sans-serif;
            color: var(--text-300);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            background-color: var(--background);
          }

          ::selection {
            color: white !important;
            background-color: var(--background-selection) !important;
          }

          a {
            text-decoration: none;
            color: var(--text-accent);
          }
        `}
      />
    </>
  )
}