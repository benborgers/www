import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

export default ({ background="var(--dark-background)"}) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <Global
        styles={css`
          :root {
            --dark-text-500: hsl(0, 0%, 100%);
            --dark-text-300: hsl(0, 0%, 60%);

            --dark-underline: hsl(0, 0%, 30%);

            --dark-background: hsl(0, 0%, 0%);


            --light-text-500: hsl(233, 12%, 10%);
            --light-text-300: hsl(233, 8%, 30%);

            --light-background: hsl(230, 23%, 95%);
            --light-background-inky: hsl(233, 12%, 10%);
          }

          * {
            font-family: "Inter", sans-serif;
            font-weight: 400;
            font-size: 16px;
            color: var(--dark-text-300);
            margin: 0;
            padding: 0;
            -webkit-appearance: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            background-color: ${background};
          }

          ::selection {
            background-color: var(--selection-background);
            color: var(--selection-text);
          }

          img {
            max-width: 100%;
          }
        `}
      />
    </>
  )
}