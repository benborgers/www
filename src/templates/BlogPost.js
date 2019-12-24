import React from "react"
import { Link } from "gatsby"
import { css, Global } from "@emotion/core"
import { MDXProvider } from "@mdx-js/react"
import { Helmet } from "react-helmet-async"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"
import Header from "../components/BlogHeader"

export default ({ pageContext, location, children }) => {
  const frontmatter = pageContext.frontmatter

  const postId = location.pathname.replace(/^\/blog\//g, "").replace(/(\/+)$/g, "")

  const shareImage = `https://benborgers.com/assets/${postId}.png`

  return (
    <>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        shareImage={shareImage}
      />

      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org", 
            "@type": "BlogPosting",
            "headline": "${frontmatter.title}",
            "image": "${shareImage}",
            "publisher": {
              "@type": "Organization",
              "name": "Ben Borgers",
              "url": "https://benborgers.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://benborgers.com/assets/index.png",
                "width": "1200",
                "height": "630"
              }
            },
            "url": "https://benborgers.com/blog/${postId}/",
            "datePublished": "${frontmatter.published}",
            "dateCreated": "${frontmatter.published}",
            "dateModified": "${frontmatter.published}",
            "description": "${frontmatter.description}",
            "author": {
              "@type": "Person",
              "name": "Ben Borgers",
              "url": "https://benborgers.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://benborgers.com/blog/"
            }
          }
        `}</script>
      </Helmet>
      
      <GlobalStyles background="var(--light-background)" />

      <Global
        styles={css`
          body {
            --selection-background: var(--light-background-inky);
            --selection-text: var(--light-background);
          }
        `}
      />

      <Header />

      <main
        css={css`
          max-width: 768px;
          margin: 0 auto;
          margin-top: 96px;
          margin-bottom: 128px;
          padding: 0 16px;

          @media(max-width: 768px) {
            margin-top: 48px;
          }
        `}
      >
        <h1
          css={css`
            margin-bottom: 32px;
            font-weight: 800;
            font-size: 32px;
            line-height: 1.3;
            color: var(--light-text-500);

            @media (max-width: 768px) {
              font-size: 24px;
            }
          `}
        >
          {frontmatter.title}
        </h1>

        <article
          css={css`            
            * {
              color: var(--light-text-300);

              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 24px;
            }

            code {
              font-family: "Roboto Mono", monospace;    
              color: white;
              border-radius: 4px;
              font-size: 15px;
              background-color: var(--light-background-inky);
              padding: 2px 4px;
            }

            pre {
              background-color: var(--light-background-inky);
              padding: 16px;
              overflow: scroll;
              border-radius: 4px;
              line-height: 1.2;
            }

            pre code {
              background-color: transparent;
              padding: 0;
            }

            code::selection {
              color: var(--light-text-500);
              background-color: var(--light-background);
            }

            a code {
              text-decoration: underline;
              text-decoration-color: var(--light-text-100);
            }

            blockquote {
              background-color: var(--light-background-dimmer);
              border-radius: 4px;
              padding: 16px;
            }

            blockquote > *:last-child {
              margin-bottom: 0;
            }

            h1 {
              font-size: 24px;
              font-weight: 700;
              color: var(--light-text-500);
              margin-top: 64px;
              margin-bottom: 8px;
            }

            ul, ol {
              margin-left: 32px;
            }

            ul li, ol li {
              margin-bottom: 12px;
            }

            hr {
              margin: 48px 0;
              border-top: 2px dashed var(--light-text-100);
            }
          `}
        >
          <MDXProvider>
            {children}
          </MDXProvider>
        </article>

        <Link
          to="/gatsby/"
          css={css`
            text-decoration: none;
          `}
        >
          <div
            css={css`
              background-color: var(--light-background-dimmer);
              padding: 16px;
              border-radius: 4px;
              margin-top: 64px;

              display: grid;
              grid-template-columns: max-content 1fr;
              grid-column-gap: 12px;
              align-items: center;
            `}
          >
            <img
              src="https://emojicdn.elk.sh/🍇"
              alt=""
              css={css`
                display: block;
                height: 16px;
              `}
            />

            <p
              css={css`
                text-decoration: underline;
                text-decoration-color: var(--light-text-100);
                color: var(--light-text-500);
                font-weight: 500;
              `}
            >
              Subscribe to my biweekly newsletter with articles and tips for Gatsby.
            </p>
          </div>
        </Link>
      </main>
    </>
  )
}