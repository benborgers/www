import Head from "next/head"
import Link from "next/link"

import Styles from "./Styles"
import Nav from "./Nav"

export default ({ header=true, heading, title, description, children }) => {
  const fullTitle = title ? title + " - Ben Borgers" : "Ben Borgers"
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ben Borgers" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://figure.netlify.com/www-share-image" />

        <meta property="twitter:card" content="summary_large_image" />

        <link rel="icon" href="https://emojicdn.elk.sh/🐙" />

        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <Styles />

      <div className="wrapper">
        {header && (
          <header>
            <Link href="/">
              <a className="logo">Ben Borgers</a>
            </Link>

            <div />

            <Nav />
          </header>
        )}

        <main>
          {heading && (
            <h1>{heading}</h1>
          )}

          {children}
        </main>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 768px;
          margin: 0 auto;
          padding: 16px;
          margin-top: 9vh;
          margin-bottom: 96px;
        }

        header {
          display: grid;
          grid-template-columns: max-content 1fr max-content;
          grid-column-gap: 24px;
          align-items: center;
        }

        header .logo {
          font-size: 20px;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.3px;
          color: var(--text-primary);
        }

        header :global(nav) {
          padding: 4px 8px;
          margin-top: 0;
          background-color: transparent;
        }

        header :global(nav a) {
          color: var(--text-tertiary);
          font-size: 18px;
        }

        main {
          margin-top: 12vh;
        }

        h1 {
          color: var(--text-primary);
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 32px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .wrapper {
            margin-top: 8px;
          }

          h1 {
            font-size: 24px;
          }

          main {
            ${header === false ? "margin-top: 8px;" : ""}
          }
        }
      `}</style>
    </>
  )
}