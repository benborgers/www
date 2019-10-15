import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet"
import snarkdown from "snarkdown"

export default ({ pageContext }) => {
  const invoice = pageContext.invoice

  let sum = 0 
  invoice.line_items.forEach(item => sum += item.amount)

  return (
    <>
      <Helmet>
        <title>Invoice for {invoice.client}</title>
        <link rel="shortcut icon" href="https://emojicdn.elk.sh/💵" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <Global
        styles={css`
          body {
            --text-primary: hsl(0, 0%, 10%);
            --text-secondary: hsl(0, 0%, 30%);
            --text-tertiary: hsl(0, 0%, 60%);
          }

          * {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            font-size: 1rem;
            color: var(--text-secondary);
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
            background-color: white;
          }
        `}
      />

      {invoice.paid &&
        <p>thx for paying</p>
      }

      {!invoice.paid &&
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 3rem;
            grid-template-areas: "left right";
            padding: 3rem;
          `}
        >
          <div
            css={css`
              grid-area: left;
            `}
          >
            <div
              css={css`
                margin-bottom: 4rem;
              `}
            >
              <p
                css={css`
                  text-transform: uppercase;
                  color: var(--text-tertiary);
                  font-weight: 600;
                  font-size: .8rem;
                  margin-bottom: .2rem;
                  letter-spacing: .05rem;
                `}
              >
                Client
              </p>

              <p
                css={css`
                  font-size: 1.5rem;
                  color: var(--text-primary);
                  font-weight: 500;
                `}
              >
                {invoice.client}
              </p>
            </div>

            <div
              css={css`
                margin-bottom: 3rem;
              `}
            >
              <p
                dangerouslySetInnerHTML={{__html: snarkdown(invoice.description)}}
                css={css`
                  font-size: 1.1rem;
                  line-height: 1.5;

                  br {
                    display: block;
                    content: "";
                    margin-top: 1rem;
                  }
                `}
              />
            </div>

            <div>
              {invoice.line_items.map(item => (
                <div
                  key={item.description}
                  css={css`
                    display: grid;
                    grid-template-columns: 1fr auto;
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                    border-bottom: 2px solid hsl(0, 0%, 90%);

                    :last-of-type {
                      margin-bottom: 0;
                      border-bottom: none;
                    }
                  `}
                >
                  <p
                    css={css`
                      font-weight: 500;
                      font-size: 1.1rem;
                      ${item.description.toLowerCase() === "total" ? `
                        color: var(--text-primary);
                      ` : ""}
                    `}
                  >
                    {item.description}
                  </p>

                  <p
                    css={css`
                      font-size: 1.1rem;
                    `}
                  >
                    ${item.amount}
                  </p>
                </div>
              ))}
            </div>

            <button
              css={css`
                margin-top: 1.5rem;
                font-weight: 600;
                padding: .5rem 1rem;
                background-color: hsl(0, 0%, 5%);
                color: white;
                border-radius: 5px;
                cursor: pointer;
              `}
            >
              Pay ${sum} →
            </button>
          </div>

          <div
            css={css`
              grid-area: right;
              justify-self: end;
            `}
          >
            <p
              css={css`
                color: var(--text-tertiary);

                strong {
                  font-weight: 600;
                  color: var(--text-secondary);
                }
              `}
            >
              {"Created on "}
              <strong>
                {new Date(invoice.created).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </strong>
              {" by "}
              <strong>
                Ben Borgers
              </strong>
            </p>
          </div>
        </div>
      }
    </>
  )
}