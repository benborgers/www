/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"

import usePersistentState from "../hooks/usePersistentState"

export default ({ slug }) => {
  const [id] = usePersistentState("id", Math.random().toString().split(".")[1])
  const [selected, setSelected] = usePersistentState("rate:" + slug)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    fetch("https://benborgers.glitch.me/ping")
    fetch("https://self-notify.glitch.me/ping")
  }, [])

  return (
    <div
      css={css`
        margin-top: 32px;
        max-width: max-content;

        @media (max-width: 500px) {
          margin-left: auto;
          margin-right: auto;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, max-content);
          grid-column-gap: 8px;
          align-items: center;

          p, button {
            margin: 0;
            line-height: 1.3;
            font-weight: 600;
            font-size: 18px;

            @media (max-width: 500px) {
              font-weight: 500;
            }
          }

          button {
            border: none;
            outline: none;
          }
        `}
      >
        <p
          css={css`
            margin-right: 16px;
          `}
        >
          Was this helpful?
        </p>

        {["Yes", "No"].map(option => (
          <button
            key={option}
            css={css`
              background-color: var(--background-tinted);
              padding: 3px 12px;
              line-height: 1;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.2s;

              ${selected === option && `
                background-color: var(--text-accent);
                color: white !important;
              `}
            `}
            onClick={() => {
              const newValue = selected === option ? "" : option
              setSelected(newValue)

              fetch("https://benborgers.glitch.me/helpful", {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  id,
                  slug,
                  selected: newValue
                })
              })
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {(selected === "No" && !sent) && (
        <>
          <p
            css={css`
              font-size: 18px;
              margin: 0;
              margin-top: 16px;
              margin-bottom: 8px;
              line-height: 1.3;
              font-weight: 500;
            `}
          >
            I'm sorry about that. What could have been better?
          </p>
          
          <form
            onSubmit={e => {
              e.preventDefault()

              setSent(true)

              const value = e.target.querySelector("textarea").value

              if(value) {
                fetch("https://self-notify.glitch.me/send", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    from: `visitor ${id}`,
                    subject: "Blog Feedback",
                    body: [
                      `blog post: ${slug}`,
                      "",
                      value
                    ].join("\n")
                  })
                })
              }
            }}
            css={css`
              max-width: 512px;

              display: grid;
              grid-template-rows: 1fr max-content 16px;
              grid-template-columns: 1fr max-content 16px;

              * {
                outline: none;
              }
            `}
          >
            <textarea
              placeholder="Feedback..."
              css={css`
                grid-row: 1 / -1;
                grid-column: 1 / -1;
                z-index: 1;

                width: 100%;
                height: 192px;
                resize: none;
                background-color: var(--background-tinted);
                border: none;
                padding: 16px;
                border-radius: 8px;
                color: var(--text-500);
                display: block;
                border: 1px solid var(--background-tinted);
                transition: border-color 0.2s;
                font-size: 18px;
                line-height: 1.5;

                :focus {
                  border-color: var(--text-accent);
                }
              `}
            />
            <input
              type="submit"
              value="Send"
              css={css`
                grid-row: 2;
                grid-column: 2;
                z-index: 2;

                display: block;
                background-color: var(--text-accent);
                color: white;
                font-weight: 500;
                font-size: 16px;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                line-height: 1;
                cursor: pointer;
              `}
            />
          </form>
        </>
      )}

      {sent === true && (
        <p
          css={css`
            font-size: 18px;
            margin: 0;
            margin-top: 16px;
            margin-bottom: 8px;
            line-height: 1.3;
            font-weight: 500;
          `}
        >
          Thank you for your feedback. 
        </p>
      )}
    </div>
  )
}