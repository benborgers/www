import React from "react"
import { css, Global } from "@emotion/core

export default () => {
  const colors = require("../util/colors.js")
  
  const cssVars = []

  for(const color in colors) {
    cssVars.push(`--${color}: ${colors[color]}`)
  }

  return (
    <Global
      style={css`
        :root {
          ${cssVars.join(";")}
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif;
          color: var(--text-gray);
          font-size: 100%;
          font-weight: 400;
          appearance: none;
          outline: none;
          background: none;
          border: none;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          background-color: var(--background-light);
        }
      `}
    />
  )
}