import React from "react"
import { Link, graphql } from "gatsby"
import { css, Global } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Header from "../components/BlogHeader"

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

          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-column-gap: 48px;
          grid-row-gap: 64px;

          @media(max-width: 768px) {
            margin-top: 48px;
          }
        `}
      >
        {posts.map((post, index) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}/`}
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
              <img
                src={`/assets/${post.id}.png`}
                alt=""
                css={css`
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                `}
                loading={index > 3 ? "lazy" : "auto"} // lazy load images past 4 blog posts
              />

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
    allMdx(sort: {fields: frontmatter___published, order: DESC}, filter: {fields: {publish: {eq: true}}}) {
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