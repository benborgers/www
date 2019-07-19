import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default props => {
  const style = css`
    color: inherit;
    font-size: inherit;
    text-decoration: none;
    position: relative;
    cursor: pointer;

    ::after {
      content: "";
      position: absolute;
      left: -.1rem;
      top: .9rem;
      width: calc(100% + .2rem);
      height: .5rem;
      background-color: var(--100);
      z-index: -1;
    }
  `

  if(props.to.startsWith("/")) {
    return <Link to={props.to} css={style}>{props.children}</Link>
  } else {
    return <a href={props.to} css={style}>{props.children}</a>
  }
}