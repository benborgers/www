import React from "react"
import { Link, graphql } from "gatsby"
import { css, Global } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Header from "../components/blog/Header"

export default ({ data }) => {
  const posts = data.allMdx.edges.map(edge => {
    return {
      ...edge.node.frontmatter,
      id: edge.node.fileAbsolutePath.split("/").reverse()[0].replace(/.mdx/, "")
    }
  })

  return (
    <>
      <Head
        title="Ben Borgers’ Blog"
        description="Articles and notes on React, Gatsby, Node, and more."
        shareImage="https://benborgers.com/assets/blog.png"
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

      <Header />

      <main
        css={css`
          max-width: 768px;
          margin: 0 auto;
          padding: 0 16px;
          margin-top: 96px;
          margin-bottom: 128px;

          @media(max-width: 768px) {
            margin-top: 48px;
          }
        `}
      >
        {posts.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.id}/`}
            css={css`
              text-decoration: none;
              display: block;

              margin-bottom: 48px;

              :last-of-type {
                margin-bottom: 0;
              }
            `}
          >
            <article
              css={css`
                background-color: white;
                box-shadow: 0px 2px 8px hsla(0, 0%, 0%, .1);
                border-radius: 8px;
                transition: box-shadow .2s;

                :hover {
                  box-shadow: 0px 4px 16px hsla(0, 0%, 0%, .2);
                }
              `}
            >
              <img
                src={`/assets/${post.id}.png`}
                alt=""
                css={css`
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                `}
              />

              <div
                css={css`
                  padding: 24px;
                  padding-bottom: 32px;
                `}
              >
                <h1
                  css={css`
                    font-size: 32px;
                    font-weight: 800;
                    line-height: 1.3;
                    color: var(--light-text-500);
                    overflow: scroll;

                    @media (max-width: 768px) {
                      font-size: 24px;
                    }
                  `}
                >
                  {post.title}
                </h1>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(sort: {fields: frontmatter___published, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
        }
      }
    }
  }
`