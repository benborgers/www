import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/portfolio/layout"

export default ({ data }) => (
  <Layout>
    <header
      css={css`
        margin-bottom: 2rem;
      `}
    >
      <h1
        css={css`
          font-size: 2rem;
          color: var(--text-black);
          font-weight: 700;
          margin-bottom: .1rem;
        `}
      >
        Hello, I'm Ben!
      </h1>
      
      <h2
        css={css`
          font-size: 1.3rem;
          font-weight: 500;
          margin-bottom: .7rem;
        `}
      >
        I design and build apps and websites in Boston, MA.
      </h2>
    </header>

    <main
      css={css`
        margin-bottom: 5rem;
      `}
    >
      <SectionHeading text="Work Experience" />

      {data.work.nodes.map(({ frontmatter }) => (
        <ProjectWrapper
          key={frontmatter.company}
        >
          <BlockEmphasized>{frontmatter.company}</BlockEmphasized>
          <P>{frontmatter.position}</P>
          <P>{frontmatter.dates}</P>
        </ProjectWrapper>
      ))}

      <SectionHeading text="Client Work" />

      {data.clientWork.nodes.map(({ frontmatter }) => (
        <ProjectWrapper
          key={frontmatter.client}
        >
          <BlockEmphasized>{frontmatter.client}</BlockEmphasized>
          <P>{frontmatter.description}</P>
          {frontmatter.link ? <A href={frontmatter.link} target="_blank" rel="noopener noreferrer">{frontmatter.link.replace(/http(s)?:\/\//, "")}</A> : ""}
        </ProjectWrapper>
      ))}

      <SectionHeading text="Personal Projects" />

      {data.personalProjects.nodes.map(({ frontmatter }) => (
        <ProjectWrapper
          key={frontmatter.name}
        >
          <BlockEmphasized>{frontmatter.name}</BlockEmphasized>
          <P>{frontmatter.description}</P>
          {frontmatter.link ? <A href={frontmatter.link} target="_blank" rel="noopener noreferrer">{frontmatter.link.replace(/http(s)?:\/\//, "")}</A> : ""}
        </ProjectWrapper>
      ))}
    </main>

    <footer>
        <A href="mailto:borgersbenjamin@gmail.com">Email</A>
        <A href="https://twitter.com/benborgers" target="_blank" rel="noopener noreferrer">Twitter</A>
    </footer>
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
      color: var(--text-black);
      font-weight: 600;
      font-size: 1.2rem;
      margin-top: 2rem;
      margin-bottom: .5rem;
    `}
  >
    {props.text}
  </h3>
)

const ProjectWrapper = styled.div(css`
  margin-bottom: 1.5rem;
`)

const BlockEmphasized = styled.p(css`
  font-weight: 700;
  margin-bottom: .3rem;
`)

const P = styled.p(css`
  line-height: 1.5;
`)

const A = styled.a(css`
  color: var(--brand);
  text-decoration: underline;
  text-decoration-color: var(--brand-light);
  display: inline-block;
  margin-right: .8rem;
  line-height: 1.5;

  transition: background-color .5s;

  :hover {
    background-color: var(--highlight);
  }
`)