import React from "react"
import { Link } from "gatsby"
import { css, Global } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Header from "../components/Header"

export default ({ pageContext: { posts } }) => {
  return (
    <>
      <Head
        title="Ben Borgers’ Blog"
        description="Articles and notes on React, Gatsby, Node, and more."
        shareImage="https://figure.netlify.com/blog-share-image"
      />

      <GlobalStyles background="var(--light-background)" />

      <Global
        styles={css`
          body {
            --selection-background: var(--light-background-inky);
            --selection-text: var(--light-background);
          }
        `}
      />

      <Header showName={true} light={true} lessWide={true} />

      <main
        css={css`
          max-width: 768px;
          margin: 0 auto;
          padding: 0 16px;
          margin-top: 96px;
          margin-bottom: 128px;

          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-column-gap: 48px;
          grid-row-gap: 64px;

          @media(max-width: 768px) {
            margin-top: 48px;
          }
        `}
      >
        {posts.map((post) => (
          <Link
            key={post.fields.Slug}
            to={`/blog/${post.fields.Slug}/`}
            css={css`
              text-decoration: none;
            `}
          >
            <article
              css={css`
                background-color: white;
                box-shadow: 0px 2px 8px hsla(0, 0%, 0%, .1);
                border-radius: 8px;
                transition: box-shadow .3s;
                height: 100%;

                :hover {
                  box-shadow: 0px 4px 16px hsla(0, 0%, 0%, .2);
                }
              `}
            >
              <div
                css={css`
                  padding: 24px;
                  padding-bottom: 32px;
                `}
              >
                <h1
                  css={css`
                    font-size: 24px;
                    font-weight: 800;
                    line-height: 1.3;
                    color: var(--light-text-500);
                    overflow: scroll;
                    margin-bottom: 16px;
                  `}
                >
                  {post.fields.Title}
                </h1>

                <p
                  css={css`
                    font-size: 16px;
                    line-height: 1.5;
                    color: var(--light-text-300);
                  `}
                >
                  {post.fields.Description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </>
  )
}