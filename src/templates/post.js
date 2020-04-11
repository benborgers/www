import React from "react"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Layout from "../components/Layout"
import Notion from "../components/Notion"
import Footer from "../components/Footer"

export default ({ pageContext }) => {
  return (
    <>
      <Head
        title={pageContext.fields.Title + " - Ben Borgers"}
        description={pageContext.fields.Description}
      />

      <GlobalStyles />

      <Helmet>
        {pageContext.html.includes("<pre") && <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.4.0/themes/prism-ghcolors.css" />}
        {pageContext.html.includes("<code") && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap" />}
      </Helmet>

      <Layout>
        <h1
          css={css`
            margin: 0;
            color: var(--text-500);
            font-weight: 700;
            font-size: 32px;
            line-height: 1.3;
            text-align: center;
            margin-top: 48px;
            margin-bottom: 24px;
          `}
        >
          {pageContext.fields.Title}
        </h1>

        <Notion raw={pageContext.html.replace(/\t/g, "&nbsp;&nbsp;")} />

        <Footer />
      </Layout>
    </>
  )
}