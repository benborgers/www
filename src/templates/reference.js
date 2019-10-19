import React from "react"
import { Helmet } from "react-helmet-async"
import { css, Global } from "@emotion/core"
import snarkdown from "snarkdown"

import "normalize.css"

export default ({ pageContext }) => {
  const { post } = pageContext

  const title = post.title
  const description = post.seo_description

  const parseMarkdown = text => snarkdown(text).replace(/<a href=/g, `<a target="_blank" rel="noopener noreferrer" href=`)

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:site_name" content="Ben Borgers" />
        <meta property="og:title" content={title} />
        <meta property="description" content={description} />
        <meta property="og:image" content={`https://benborgers.com/reference/${post.slug}.png`} />
        <meta property="og:url" content={`https://benborgers.com/reference/${post.slug}`} />

        
        <link rel="shortcut icon" href="https://emojicdn.elk.sh/👨‍💻" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <Global
        styles={css`
          :root {
            --text-black: hsl(200, 29%, 16%);
            --text-gray: hsl(200, 20%, 35%);
            --text-lightgray: hsl(200, 10%, 55%);
            --text-background-light: hsl(200, 30%, 93%);

            --accent: hsl(53, 100%, 50%);

            --background: hsl(0, 0%, 100%);
          }

          * {
            font-family: "Inter", sans-serif;
          }

          body {
            background-color: var(--background);
          }

          ::selection {
            color: var(--text-black);
            background-color: var(--accent);
          }

          a {
            color: var(--text-black);
            text-decoration: underline;
            transition: text-decoration-color .2s;
          }

          a:hover {
            text-decoration-color: var(--accent);
          }
        `}
      />

      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(24px, 1fr) minmax(0, 768px) minmax(24px, 3fr);
        `}
      >

        <div
          css={css`
            grid-column: 2;
            padding-top: 72px;
            padding-bottom: 96px;

            @media(max-width: 768px) {
              padding-top: 32px;
            }
          `}
        >
          <h1
            css={css`
              color: var(--text-black);
              margin-bottom: 16px;
              margin-top: 0;
            `}
          >
            {post.title}
          </h1>

          <p
            css={css`
              color: var(--text-lightgray);
              padding-left: 8px;
              border-left: 3px solid var(--accent);
              font-weight: 500;
              font-size: .9rem;
              margin: 0;
            `}
          >
            Last updated:
            {" "}
            <time itemProp="dateModified" dateTime={post.last_updated}>
              {new Date(post.last_updated).toLocaleString("en-US", {
                timeZone: "America/New_York",
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </time>
          </p>

          <div
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.body) }}
            css={css`
              color: var(--text-black);
              margin-top: 32px;
              line-height: 1.5;

              h1 {
                font-size: 24px;
              }

              h2 {
                font-size: 20px;
                font-weight: 600;
              }

              br {
                display: block;
                content: "";
                margin-top: 1rem;
              }

              .code, blockquote {
                margin: 32px 0;
              }

              code, .code {
                font-family: "SFMono-Regular", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
                font-size: .95rem;
                background-color: var(--text-background-light);
              }

              code {
                padding: 2px 4px;
                border-radius: 2px;
              }

              .code {
                padding: 12px;
                border-radius: 4px;
              }

              blockquote {
                padding: 16px 0;
                padding-left: 32px;
                border-left: 4px solid var(--accent);
                font-style: italic;
              }

              img {
                max-width: 100%;
                border-radius: 4px;
              }
            `}
          />

          <p
            css={css`
              margin-top: 64px;
              font-style: italic;
              font-size: .9rem;
              color: var(--text-lightgray);
              line-height: 1.5;

              a {
                color: inherit;
              }
            `}
          >
            Written by <a href="https://twitter.com/benborgers" target="_blank" rel="noopener noreferrer">Ben Borgers</a>. If you notice something wrong or have a question, feel free to <a href="mailto:borgersbenjamin@gmail.com" target="_blank" rel="noopener noreferrer">email me</a>.
          </p>
        </div>

      </div>
    </>
  )
}