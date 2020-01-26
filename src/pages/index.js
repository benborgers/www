import React, { useState, useEffect } from "react"

import Shell from "../components/Shell"
import GridParent from "../components/GridParent"
import GridChild from "../components/GridChild"

export default () => {
  const [blocksUsers, setBlocksUsers] = useState(900)

  useEffect(() => {
    fetch("https://blocks-api.glitch.me/stats")
      .then(res => res.json())
      .then(json => {
        setBlocksUsers(json.users)
      })
  }, [])

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

        <GridChild heading="Projects">
          <ul>
            <li>
              <a href="https://blocks.elk.sh">Blocks</a>, a progressive web app for Lexington High School's rotating schedule used by {blocksUsers} students and teachers.
            </li>
            <li>
              <a href="https://github.com/benborgers/figure">Figure</a>, an open-source project for using your Figma design assets on your website.
            </li>
            <li>
              <a href="https://progress.elk.sh">Progress</a>, calculating what percentage of the school year we've made it through.
            </li>
            <li>
              Study guides for <a href="https://chem.elk.sh">AP Chemistry</a> and <a href="https://bio.elk.sh">AP Biology</a>.
            </li>
          </ul>
        </GridChild>

        <GridChild heading="Contact">
          <p>
            <a href="mailto:borgersbenjamin@gmail.com">Email</a>, <a href="https://twitter.com/benborgers">Twitter</a>, and <a href="https://github.com/benborgers">GitHub</a>.
          </p>
        </GridChild>
      </GridParent>
    </Shell>
  )
}