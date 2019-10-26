import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet-async"
import { FileText } from "react-feather"

import GlobalStyles from "../components/reference/GlobalStyles"


export default ({ pageContext }) => {
  const { list } = pageContext

  return (
    <>
      <Helmet>
        <title>All References — Ben Borgers</title>
        <link rel="icon" href="https://emojicdn.elk.sh/👨‍💻" />
      </Helmet>

      <GlobalStyles />

      <div
        css={css`
          padding: 1rem;
          max-width: 600px;
        `}
      >

        <h1
          css={css`
            font-size: 1.5rem;
            color: var(--text-black);
            font-weight: 600;
            margin-bottom: 24px;
          `}
        >
          All References
        </h1>

        <ul
          css={css`
            padding: 0;
          `}
        >
          {list.map(post => (
            <li
              key={post.slug}
              css={css`
                list-style-type: none;
              `}
            >
              <Link
                to={`/reference/${post.slug}/`}
                css={css`
                  text-decoration: none;
                `}
              >

                {/* card for each post */}
                <div
                  css={css`
                    border: 2px solid var(--text-background-light);
                    padding: 16px;
                    margin: 12px 0;
                    border-radius: 4px;
                    
                    display: grid;
                    grid-template-columns: max-content auto;
                    align-items: center;
                    grid-column-gap: 8px;

                    transition: border-color .2s;

                    @media (hover: hover) {
                      :hover {
                        border-color: var(--accent);
                      }
                    }
                  `}
                >
                  <FileText
                    color="var(--text-lightgray)"
                    height="1.1rem"
                    strokeWidth="2.2"
                  />

                  <p
                    css={css`
                      color: var(--text-gray);
                      margin: 0;
                      line-height: 1.3;
                    `}
                  >
                    {post.title}
                  </p>
                </div>

              </Link>
            </li>
          ))}
        </ul>

      </div>

    </>
  )
}