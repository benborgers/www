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

            --dark-background: hsl(0, 0%, 0%);

            --dark-underline: hsl(0, 0%, 30%);


            --light-text-500: hsl(233, 12%, 10%);
            --light-text-300: hsl(233, 8%, 30%);
            --light-text-100: hsl(233, 16%, 60%);

            --light-background: hsl(230, 23%, 95%);
            --light-background-inky: hsl(233, 12%, 10%);
            --light-background-dimmer: hsl(230, 25%, 90%);


            --gatsby-text-500: hsl(276, 20%, 20%);
            --gatsby-text-300: hsl(276, 10%, 45%);

            --gatsby-background: hsl(276, 60%, 98%);

            --gatsby-accent: hsl(276, 70%, 44%);
            --gatsby-accent-light: hsl(276, 70%, 90%);
            --gatsby-accent-light-darker: hsl(276, 70%, 88%);
            --gatsby-underline: hsl(276, 40%, 70%);
            --gatsby-box-shadow: 0px 4px 8px hsla(276, 70%, 30%, .1);
          }

          * {
            font-family: "Inter", sans-serif;
            font-weight: 400;
            font-size: 16px;
            color: var(--dark-text-300);
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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