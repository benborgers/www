import React from "react"
import { css } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Layout from "../components/Layout"
import Notion from "../components/Notion"

export default ({ pageContext: { projects }}) => {
  return (
    <>
      <Head
        title="Ben Borgers"
        description="I'm a 17 year old programmer from Boston, MA. I make things with JavaScript, Node.js, React, and React Native. Summer intern at IBM for 2019 and 2020."
      />

      <GlobalStyles />

      <Layout
        css={css`
          p {
            line-height: 1.5;
            font-size: 18px;
          }
        `}
      >
        <p>
          Hey! I'm Ben Borgers.
        </p>
        <p>
          I'm a 17 year old programmer from Boston, MA. I make things with JavaScript, Node.js, React, and React Native.
        </p>
        <p>
          I'm a summer intern at <a href="https://www.ibm.com/security/data-security/guardium">IBM</a> for 2019 and 2020.
        </p>
        <p>
          I'm on <a href="https://twitter.com/benborgers">twitter</a> and <a href="https://github.com/benborgers">github</a>. If you want to get in touch, feel free to <a href="mailto:borgersbenjamin@gmail.com">email</a> me!
        </p>

        <p
          css={css`
            margin-top: 48px;
            font-weight: 700;
          `}
        >
          Here are some projects I've made: 
        </p>

        <div
          css={css`
            display: grid;
            grid-auto-rows: max-content;
            grid-row-gap: 16px;
          `}
        >
          {projects.map((project, i) => (
            <a
              href={(!project.fields.Link.startsWith("http") ? "https://" : "") + project.fields.Link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.fields.Name}
              css={css`
                text-decoration: none;
              `}
            >
              <div
                css={css`
                  padding: 16px;
                  padding-bottom: 20px;
                  border: 1px solid var(--border);
                  border-radius: 8px;
                  transition: background-color 0.2s;

                  @media (hover: hover) {
                    :hover {
                      background-color: var(--background-tinted);
                    }
                  }
                `}
              >
                <p
                  css={css`
                    margin: 0;
                    font-weight: 600;
                    font-size: 18px;
                    margin-bottom: 8px;
                  `}
                >
                  {project.fields.Name}
                </p>

                <Notion raw={project.fields.Description} />
              </div>
            </a>
          ))}
        </div>
      </Layout>
    </>
  )
}