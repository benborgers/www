import React, { useState } from "react"
import { css } from "@emotion/core"
import { addSubscriber } from "underline-email"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"

export default () => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = () => {
    addSubscriber("at94e", email)
      .then(result => {
        if(result.error) {
          alert(result.error.message)
        } else {
          setEmail("")
          setSubscribed(true)
        }
      })
  }

  return (
    <>
      <Head
        title="Gatsby Dispatch"
        description="A biweekly newsletter with links and tips for Gatsby.js"
        shareImage="https://benborgers.com/assets/gatsby-dispatch.png"
        favicon="🍇"
      />

      <GlobalStyles background="var(--gatsby-background)" />

      <div
        css={css`
          --selection-background: var(--gatsby-accent-light);
          --selection-text: var(--gatsby-text-500);

          border-top: 6px solid var(--gatsby-accent);
          display: grid;
          grid-template-rows: 15vh 1fr;
          grid-template-columns: minmax(16px, 1fr) minmax(0, 768px) minmax(16px, 1fr);

          @media (max-width: 768px) {
            grid-template-rows: 24px 1fr;
          }

          *:focus {
            outline-color: var(--gatsby-underline-darker);
          }
        `}
      >
        <div
          css={css`
            background-color: var(--gatsby-background);
            grid-row: 2;
            grid-column: 2;

            * {
              color: var(--gatsby-text-300);
              line-height: 1.5;
              font-size: 18px;
            }

            h1 {
              color: var(--gatsby-text-500);
              font-weight: 500;
            }

            a, strong {
              font-size: inherit;
              font-weight: inherit;
              color: inherit;
            }

            a {
              text-decoration-color: var(--gatsby-underline);
            }

            strong {
              font-weight: 700;
            }

            h1, p {
              margin-bottom: 16px;
            }
          `}
        >
          <h1>
            Hi! I'm <a href="https://twitter.com/benborgers">Ben</a>, a high schooler from Boston.
          </h1>

          <p>
            I'm a big fan of <a href="https://gatsbyjs.org">Gatsby</a>, so every two weeks I write a quick roundup of articles and tips about Gatsby to help you stay up to date.
          </p>

          <p>
            Sign up for the <strong>Gatsby Dispatch</strong>:
          </p>

          <div
            css={css`
              background-color: white;
              padding: 16px;
              padding-left: 24px;
              border-radius: 8px;
              margin-top: 32px;
              box-shadow: var(--gatsby-box-shadow);

              display: grid;
              grid-template-columns: 1fr max-content;
              grid-column-gap: 16px;
              align-items: center;

              @media (max-width: 512px) {
                padding-left: 16px;

                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                grid-row-gap: 16px;
              }
            `}
          >
            {subscribed ? (
              <p
                css={css`
                  font-weight: 500;
                  text-align: center;
                  margin-bottom: 0 !important;

                  grid-column: 1 / span 2;

                  @media (max-width: 512px) {
                    grid-column: 1;
                    grid-row: 1 / span 2;
                  }
                `}
              >
                Thank you for subscribing!
              </p>
            ) : (
              <>
                <input
                  placeholder="you@awesome.com"
                  type="email"
                  css={css`
                    border: none;
                    background: none;
                    width: 100%;
                    padding: 8px 0;

                    ::placeholder {
                      color: var(--gatsby-text-300);
                    }

                    :focus {
                      outline: none;
                    }
                  `}
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />

                <button
                  css={css`
                    background-color: var(--gatsby-accent-light);
                    color: var(--gatsby-accent);
                    border: none;
                    padding: 8px 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    font-weight: 500;
                    user-select: none;
                    transition: background-color .2s;

                    :hover, :focus {
                      outline: none;
                      background-color: var(--gatsby-accent-light-darker);
                    }
                  `}
                  onClick={onSubscribe}
                >
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}