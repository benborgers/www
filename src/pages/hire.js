import React from "react"
import { css } from "@emotion/core"

import Shell from "../components/Shell"
import GridParent from "../components/GridParent"
import GridChild from "../components/GridChild"
import Spacer from "../components/Spacer"

export default () => {
  return (
    <Shell
      title="Hire me! | Ben Borgers"
      description="I'd love to help you create a website or web app that you can easily update and maintain."
    >
      <p
        css={css`
          font-size: 24px;
          font-weight: 600;
          line-height: 1.3;

          * {
            font: inherit;
          }

          a {
            text-decoration-color: var(--dark-underline);
            transition: color .2s;
          }

          a:hover {
            color: var(--dark-text-500);
          }

          @media (max-width: 844px) {
            font-size: 20px;
            font-weight: 500;
          }
        `}
      >
        I'd love to help you create a website or web app that you can easily update and maintain. If you'd like to talk, <a href="mailto:borgersbenjamin@gmail.com">send me an email</a>.
      </p>

      <Spacer height={64} />

      <GridParent>
        <GridChild heading="Happy clients">
          <ul>
            <li>
              <a href="https://elisapearmain.netlify.com">Elisa Pearmain</a>, a therapist in Concord, MA. 
            </li>
            <li>
              <a href="https://eastsideultimate.com">Eastside Ultimate</a>, a competitive Ultimate Frisbee club team. 
            </li>
            <li>
              <a href="https://onecello.org/">One Cello, One Planet</a>, a concert series focusing on the urgency of climate change.
            </li>
            <li>
              <a href="https://thomashazeldine.com/">Thomas Hazeldine</a>, a film student specializing in editing.
            </li>
          </ul>
        </GridChild>
      </GridParent>
    </Shell>
  )
}