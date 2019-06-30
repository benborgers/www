import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/portfolio/layout"

export default ({ data }) => (
  <Layout>
    <header>
      <h1
        css={css`
        
        `}
      >
        Hey, I'm Ben!
      </h1>
      
      <h2
        css={css`
        
        `}
      >
        I design and build apps and websites.
      </h2>

      <div
        css={css`

        `}
      >
        <a href="mailto:borgersbenjamin@gmail.com">Email</a>
        <a href="https://twitter.com/benborgers" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>

      <SectionHeading text="Work Experience" />

      {data.work.nodes.map(({ frontmatter }) => (
        <div
          key={frontmatter.company}
        >
          <p>{frontmatter.company}</p>
          <p>{frontmatter.position}</p>
          <p>{frontmatter.dates}</p>
        </div>
      ))}

      <SectionHeading text="Client Work" />

      {data.clientWork.nodes.map(({ frontmatter }) => (
        <div
          key={frontmatter.client}
        >
          <p>{frontmatter.client}</p>
          <p>{frontmatter.description}</p>
          <a href={frontmatter.link}>{frontmatter.link.replace(/http(s)?:\/\//, "")}</a>
        </div>
      ))}

      <SectionHeading text="Personal Projects" />

      {data.personalProjects.nodes.map(({ frontmatter }) => (
        <div
          key={frontmatter.name}
        >
          <p>{frontmatter.name}</p>
          <p>{frontmatter.description}</p>
          <a href={frontmatter.link}>{frontmatter.link.replace(/http(s)?:\/\//, "")}</a>
        </div>
      ))}
    </header>

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

const SectionHeading = props => (
  <h3
    css={css`

    `}
  >
    {props.text}
  </h3>
)