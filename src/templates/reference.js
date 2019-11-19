import React from "react"
import { Helmet } from "react-helmet-async"
import { css } from "@emotion/core"
import snarkdown from "snarkdown"

import GlobalStyles from "../components/reference/GlobalStyles"

export default ({ pageContext }) => {
  const { post } = pageContext

  const title = post.title
  const description = post.seo_description
  const ogImage = encodeURI(`https://og-image.glitch.me/image.png/{title}/hsl(200, 29%, 16%)/linen`)

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ben Borgers" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`https://benborgers.com/reference/${post.slug}`} />

        <meta name="twitter:card" content="summary_large_image" />

        
        <link rel="icon" href="https://emojicdn.elk.sh/👨‍💻" />
      </Helmet>

      <GlobalStyles />

      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(16px, 1fr) minmax(0, 768px) minmax(16px, 3fr);
        `}
      >

        <div
          css={css`
            grid-column: 2;
            padding-top: 72px;
            padding-bottom: 96px;

            @media(max-width: 768px) {
              padding-top: 24px;
            }
          `}
        >
          <h1
            css={css`
              color: var(--text-black);
              margin-bottom: 16px;
              margin-top: 0;
              line-height: 1.2;
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
            dangerouslySetInnerHTML={{ __html: snarkdown(post.body) }}
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
                overflow: scroll;
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
            Written by <a href="https://twitter.com/benborgers">Ben Borgers</a>. If you notice something wrong or have a question, feel free to <a href="mailto:borgersbenjamin@gmail.com">email me</a>.
          </p>
        </div>

      </div>
    </>
  )
}
