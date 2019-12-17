import React from "react"
import { Link } from "gatsby"
import { css, Global } from "@emotion/core"
import { MDXProvider } from "@mdx-js/react"
import { Helmet } from "react-helmet-async"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"

export default ({ pageContext, location, children }) => {
  const frontmatter = pageContext.frontmatter

  const postId = location.pathname.replace(/^\/blog\//g, "").replace(/(\/+)$/g, "")

  return (
    <>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        shareImage={`https://benborgers.com/assets/${postId}.png`}
      />

      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" />
      </Helmet>
      
      <GlobalStyles background="var(--light-background)" />

      <Global
        styles={css`
          body {
            --selection-background: var(--light-background-inky);
            --selection-text: var(--light-background);
          }
        `}
      />

      <header
        css={css`
          position: sticky;
          top: 0;
          left: 0;
          background-color: hsl(0, 0%, 100%, .8);
          padding: 16px 0;
          backdrop-filter: blur(24px);
          box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.05);
        `}
      >
        <div
          css={css`
            max-width: 768px;
            margin: 0 auto;
            padding: 0 16px;
          `}
        >
          <Link
            to="/"
            css={css`
              text-decoration: none;
            `}
          > 
            <p
              css={css`
                font-weight: 600;
                color: var(--light-text-500);
                letter-spacing: -0.3px;
              `}
            >
              Ben Borgers's Blog
            </p>
          </Link>
        </div>
      </header>

      <main
        css={css`
          max-width: 768px;
          margin: 0 auto;
          margin-top: 96px;
          margin-bottom: 128px;
          padding: 0 16px;

          @media(max-width: 768px) {
            margin-top: 48px;
          }
        `}
      >
        <h1
          css={css`
            margin-bottom: 32px;
            font-weight: 800;
            font-size: 32px;
            line-height: 1.2;
            color: var(--light-text-500);
          `}
        >
          {frontmatter.title}
        </h1>

        <div
          css={css`            
            * {
              color: var(--light-text-300);

              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 24px;
            }

            code {
              font-family: "Roboto Mono", monospace;    
              color: white;
              border-radius: 4px;
              font-size: 15px;
              background-color: var(--light-background-inky);
              padding: 2px 4px;
            }

            pre {
              background-color: var(--light-background-inky);
              padding: 16px;
              overflow: scroll;
              border-radius: 4px;
              line-height: 1.2;
            }

            pre code {
              background-color: transparent;
              padding: 0;
            }

            code::selection {
              color: var(--light-text-500);
              background-color: var(--light-background);
            }
          `}
        >
          <MDXProvider>
            {children}
          </MDXProvider>
        </div>
      </main>
    </>
  )
}