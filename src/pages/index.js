import React from "react"
import { css } from "@emotion/core"

import Layout from "../components/Layout"
import Text from "../components/Text"
import Link from "../components/Link"

export default () => {
  return (
    <Layout
      description="Hi! I'm Ben. I make apps and websites."
      chip=""
      color="blue"
    >
      <Text type="primary">
        Hi! I'm Ben. I make apps and websites.
      </Text>

      <Text
        type="secondary"
        style={css`
          margin-bottom: 2rem;
        `}
      >
        I'm on <Link to="https://twitter.com/benborgers">Twitter</Link>, <Link to="https://github.com/benborgers">GitHub</Link>, or you can <Link to="mailto:borgersbenjamin@gmail.com">email me</Link>.
        There's also a list of my <Link to="/projects">projects</Link>.
      </Text>

      <img
        src="https://media.giphy.com/media/htinLom37opJDyuajR/giphy.gif"
        alt="5 stars"
        css={css`
          border-radius: .3rem;
          max-width: 100%;
        `}
      />
    </Layout>
  )
}