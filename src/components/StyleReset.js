import React from "react"
import { css, Global } from "@emotion/core"

export default () => {
  return (
    <Global
      styles={css`
        * {
          font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 1rem;
          margin: 0;
          padding: 0;
          outline: none;
          background: transparent;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
        }
      `}
    />
  )
}