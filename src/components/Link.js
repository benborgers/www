import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default props => {
  const style = css`
    color: inherit;
    font-size: inherit;
    text-decoration: underline;
    position: relative;
    cursor: pointer;
    display: inline-block;

    ${props.noUnderline && "text-decoration: none;"`}
  `

  if(props.to.startsWith("/")) {
    return <Link to={props.to} css={style}>{props.children}</Link>
  } else {
    return <a href={props.to} css={style}>{props.children}</a>
  }
}
