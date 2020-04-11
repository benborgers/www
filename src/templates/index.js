import React from "react"
import { css } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Layout from "../components/Layout"
import Image from "../components/Image"
import Notion from "../components/Notion"

export default ({ pageContext: { projects }}) => {
  return (
    <>
      <Head
        title="Ben Borgers"
        description="I'm a 17 year old programmer from Boston, MA. I make things mostly in JavaScript, Node.js, React, and React Native. Summer intern at IBM for 2019 and 2020."
      />

      <GlobalStyles />

      <Layout>
        <section
          css={css`
            margin-bottom: 64px;
          `}
        >
          <Image>
            <h1
              css={css`
                color: var(--text-500);
                font-size: 24px;
                margin-top: 0;
                margin-bottom: 8px;
              `}
            >
              Ben Borgers
            </h1>

            <p
              css={css`
                margin: 0;
                font-size: 18px;
                line-height: 1.5;
              `}
            >
              I'm a 17 year old programmer from Boston, MA. I make things mostly in JavaScript, Node.js, React, and React Native. Summer intern at
              {" "}
              <a href="https://www.ibm.com/security/data-security/guardium">
                IBM
              </a>
              {" "}
              for 2019 and 2020.
            </p>

            <div
              css={css`
                margin-top: 20px;

                a {
                  color: var(--text-500);
                  font-weight: 500;
                  text-decoration: none;
                }

                a::after {
                  content: "·";
                  display: inline-block;
                  margin: 0 4px;
                  font-weight: 900;
                  color: var(--text-300);
                }

                a:last-of-type::after {
                  content: "";
                }
              `}
            >
              <a href="https://twitter.com/benborgers">Twitter</a>
              <a href="https://github.com/benborgers">GitHub</a>
              <a href="mailto:borgersbenjamin@gmail.com">Email</a>
            </div>
          </Image>
        </section>

        <section>
          <h2
            css={css`
              font-size: 24px;
              color: var(--text-500);
              margin-top: 0;
              margin-left: 24px;
              margin-bottom: 24px;
            `}
          >
            Projects
          </h2>

          <div>
            {projects.map((project, i) => (
              <a
                href={project.fields.Link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.fields.Name}
                css={css`
                  text-decoration: none;
                `}
              >
                <div
                  css={css`
                    padding: 24px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    ${i !== projects.length -1 ? "margin-bottom: 16px;" : ""}
                    transition: background-color 0.2s;

                    :hover {
                      background-color: var(--background-tinted);
                    }
                  `}
                >
                  <p
                    css={css`
                      margin: 0;
                      font-weight: 600;
                      font-size: 20px;
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
        </section>
      </Layout>
    </>
  )
}