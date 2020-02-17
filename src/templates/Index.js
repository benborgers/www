import React from "react"
import { css } from "@emotion/core"

import Shell from "../components/Shell"
import GridParent from "../components/GridParent"
import GridChild from "../components/GridChild"

export default ({ pageContext: { projects } }) => {
  return (
    <Shell
      title="Ben Borgers"
      description="I'm a 17 year old developer from Boston, MA. I'm currently in high school, and interned at IBM last summer."
    >
      <GridParent>
        <GridChild heading="Ben Borgers">
          <p>
            Hi! I'm a 17 year old developer from Boston, MA. I'm currently in high school, and interned at <a href="https://www.ibm.com/security/data-security/guardium">IBM</a> last summer.
          </p>
        </GridChild>

        <GridChild heading="Links">
          <p>
            <a href="mailto:borgersbenjamin@gmail.com">Email</a>, <a href="https://twitter.com/benborgers">Twitter</a>, and <a href="https://github.com/benborgers">GitHub</a>.
          </p>
        </GridChild>

        <GridChild heading="Projects">
          <div
            css={css`
              h1 {
                margin-bottom: 8px;
                margin-top: 32px;
              }

              h1:first-of-type {
                margin-top: 0;
              }

              p {
                margin-bottom: 8px;
              }
            `}
            dangerouslySetInnerHTML={{ __html: projects }}
          />
        </GridChild>
      </GridParent>
    </Shell>
  )
}