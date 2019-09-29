import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet"
import snarkdown from "snarkdown"

import Spacer from "../components/Spacer"

export default () => {
  const projects = require("../cms/projects.json")
  const clients = require("../cms/clients.json")

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
            --text-highlight: hsl(253, 100%, 75%);

            --highlight-light: hsl(253, 20%, 30%);

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
            box-sizing: border-box;
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

          ::-webkit-scrollbar {
            width: 0;
            background: transparent;
          }
        `}
      />

      <div
        css={css`
          padding: 3rem;

          @media (max-width: 50rem) {
            padding: 1.5rem;
            padding-bottom: 3rem;
          }

          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: minmax(0, 30rem) 1fr;
          grid-column-gap: 5rem;
          grid-template-areas:  "main social"
                                "main .";

          @media (max-width: 42rem) {
            grid-template-areas:  "main main"
                                  "social social";
          }
        `}
      >
        <div
          css={css`
            grid-area: main;
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

          <H1>
            Projects
          </H1>

          {projects.projects.map(project => {
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
          
          <Spacer height={3} />

          <H1>
            Clients
          </H1>

          {clients.projects.map(project => {
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

        <div
          css={css`
            grid-area: social;
            justify-self: end;
            border-right: 3px solid var(--highlight-light);
            padding: .5rem 0;
            padding-right: 2rem;

            @media (max-width: 42rem) {
              justify-self: start;
              margin-top: 4rem;
              border: none;
              padding-top: 2rem;
              border-top: 3px solid var(--highlight-light);
              width: 100%;
            }
          `}
        >
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
            last={true}
          />
        </div>
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

        ${props.last && `
          margin-bottom: 0;
        `}
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