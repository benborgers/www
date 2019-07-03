import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/portfolio/layout"

export default ({ data }) => (
  <Layout>
    <div
      css={css`
        padding: 1.5rem;
      `}>
      <p>This site is currently under construction.</p>
    </div>
  </Layout>
)

export const query = graphql`
  {
    work: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/\\/work\\//"}}, sort: {fields: frontmatter___index, order: ASC}) {
      nodes {
        frontmatter {
          company
          position
          dates
          index
        }
      }
    }

    clientWork: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/\\/client-work\\//"}}, sort: {fields: frontmatter___index, order: ASC}) {
      nodes {
        frontmatter {
          client
          description
          link
          index
        }
      }
    }

    personalProjects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/\\/projects\\//"}}, sort: {fields: frontmatter___index, order: ASC}) {
      nodes {
        frontmatter {
          name
          description
          link
        }
      }
    }
  }
`
