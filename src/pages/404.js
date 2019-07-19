import React, { useState, useEffect } from "react"

import Layout from "../components/Layout"
import Text from "../components/Text"

export default () => {
  const [pathname, setPathname] = useState("")

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