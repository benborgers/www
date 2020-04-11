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

            --monospace: "Roboto Mono", monospace;

            --background: white;
            --background-tinted: hsl(216, 100%, 98%);
            --background-selection: hsl(216, 100%, 60%);

            --border: hsl(216, 20%, 90%);
            --underline: hsla(216, 30%, 50%, 0.4);
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
            text-decoration-color: var(--underline);
            transition: opacity 0.2s;
          }

          a:hover {
            opacity: 0.7;
          }
        `}
      />
    </>
  )
}