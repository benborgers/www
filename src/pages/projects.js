import React from "react"
import { css } from "@emotion/core"

import Layout from "../components/Layout"
import Text from "../components/Text"
import Link from "../components/Link"

const projects = require("../data/projects.json")

export default () => {
  return (
    <Layout
      title="Projects — Ben Borgers"
      description="Hi! I'm Ben. These are some of my projects."
      chip="projects"
      color="blue"
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-column-gap: 1rem;
          grid-row-gap: .7rem;
        `}
      >
        {projects.map(project => (
          <React.Fragment
            key={project.name}
          >
            <Link to={project.link}>
              <Text type="primary">
                {project.name}
              </Text>
            </Link>

            <Text type="secondary">
              {project.tagline}
            </Text>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  )
}