import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet"
import snarkdown from "snarkdown"

import Spacer from "../components/Spacer"

export default () => {
  const projects = require("../cms/projects.json")

  const title = "Ben Borgers"
  const description = "Hi! I'm Ben. I make apps and websites."

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        <link rel="shortcut icon" href="https://emojicdn.elk.sh/⛅" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inconsolata:400,700&display=swap" />
      </Helmet>

      <Global
        styles={css`
          body {
            --text-primary: hsl(272, 20%, 95%);
            --text-secondary: hsl(272, 20%, 80%);
            --text-tertiary: hsl(272, 40%, 70%);
            --text-highlight: hsl(253, 100%, 75%);

            --background: hsl(240, 19%, 11%);
          }

          * {
            font-family: "Inconsolata", "Menlo", monospace;
            font-size: 1rem;
            color: var(--text-primary);
            font-weight: 400;
            margin: 0;
            padding: 0;
            border: none;
            background: transparent;
            -webkit-appearance: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            background-color: var(--background);
          }

          ::selection {
            background-color: var(--text-highlight);
            color: var(--text-primary);
          }
        `}
      />

      <div
        css={css`
          padding: 3rem;
          max-width: 30rem;
        `}
      >
        <H1>
          Ben Borgers
        </H1>

        <p
          css={css`
            line-height: 1.5;
            color: var(--text-secondary);

            a {
              color: var(--text-highlight);
              text-decoration: none;
            }
          `}
        >
          A 17 year old developer in Boston, Massachusetts. Currently in high school, and interned at <a href="https://www.ibm.com/security/data-security/guardium">IBM</a> last summer.
        </p>

        <Spacer height={4} />

        <SocialLine
          name="Email"
          linkText="borgersbenjamin@gmail.com"
          link="mailto:borgersbenjamin@gmail.com"
        />

        <SocialLine
          name="GitHub"
          linkText="github.com/benborgers"
          link="https://github.com/benborgers"
        />

        <SocialLine
          name="Twitter"
          linkText="twitter.com/benborgers"
          link="https://twitter.com/benborgers"
        />

        <Spacer height={3} />

        <H1>
          Projects
        </H1>

        {projects.project_list.map(project => {
          const text = snarkdown(project.text)

          return (
            <p
              dangerouslySetInnerHTML={{__html: text }}
              css={css`
                line-height: 1.5;
                color: var(--text-secondary);
                margin-bottom: 1.5rem;

                a {
                  color: var(--text-highlight);
                  text-decoration: none;
                }
              `}
              key={project.text}
            />
          )
        })}
      </div>
    </>
  )
}

const H1 = props => {
  const style = `
    font-weight: 700;
    margin-bottom: .5rem;
  `

  return (
    <h1
      css={css`
        ${style}
        
        * {
          ${style}
        }
      `}
    >
      <LeadingDash />
      {props.children}
    </h1>
  )
}

const SocialLine = props => {
  return (
    <div
      css={css`
        margin-bottom: 2rem;
        max-width: max-content;
      `}
    >
      <p
        css={css`
          font-weight: 700;
          margin-bottom: .4rem;
        `}
      >
        <LeadingDash />
        {props.name}
      </p>

      <Link to={props.link}>
        <p
          css={css`
            max-width: max-content;
            color: var(--text-highlight);
          `}
        >
          {props.linkText}
        </p>
      </Link>
    </div>
  )
}

const LeadingDash = () => {
  return (
    <span
      css={css`
        color: var(--text-primary);
        display: inline-block;
        margin-right: .5rem;
      `}
    >
      -
    </span>
  )
}

const Link = props => {
  const style = css`
    text-decoration: none;
  `

  if(props.to.startsWith("/")) {
    return (
      <GatsbyLink to={props.to} css={style}>
        {props.children}
      </GatsbyLink>
    )
  } else {
    return (
      <a href={props.to} css={style}>
        {props.children}
      </a>
    )
  }
}