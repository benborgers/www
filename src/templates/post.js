import React from "react"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Layout from "../components/Layout"
import Image from "../components/Image"
import Notion from "../components/Notion"

export default ({ pageContext }) => {
  return (
    <>
      <Head
        title={pageContext.fields.Title + " - Ben Borgers"}
        description={pageContext.fields.Description}
      />

      <GlobalStyles />

      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.4.0/themes/prism-ghcolors.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap" />
      </Helmet>

      <Layout>
        <Image>
          <h1
            css={css`
              margin: 0;
              color: var(--text-500);
              font-weight: 700;
              font-size: 24px;
              line-height: 1.3;
            `}
          >
            {pageContext.fields.Title}
          </h1>
        </Image>

        <div
          css={css`
            margin-bottom: 32px;
          `}
        />

        <Notion raw={pageContext.html.replace(/\t/g, "&nbsp;&nbsp;")} />

        <footer
          css={css`
            margin-top: 64px;
            padding-top: 24px;
            border-top: 2px solid var(--underline);
          `}
        >
          <p
            css={css`
              font-weight: 500;
              line-height: 1.4;
              margin: 0;
            `}
          >
            Written by <a href="https://twitter.com/benborgers">Ben Borgers</a>. If you spot a mistake or have a question, don't hesitate to <a href="mailto:borgersbenjamin@gmail.com">email me</a>!
          </p>
        </footer>
      </Layout>
    </>
  )
}