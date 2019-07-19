import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"

import Layout from "../components/Layout"
import Text from "../components/Text"
import Link from "../components/Link"

const projects = require("../data/projects.json")

export default () => {
  const [pathname, setPathname] = useState("404")

  useEffect(() => {
    setPathname(window.location.pathname.substr(1))
  }, [])

  return (
    <Layout title="404" chip={pathname} color="blue">
      <Text type="primary">
        Whoops! This page could not be found.
      </Text>
    </Layout>
  )
}