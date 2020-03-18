import Router from "next/router"
import * as Fathom from "fathom-client"

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview()
})

export default ({ Component, pageProps }) => {
  React.useEffect(() => {
    if(process.env.NODE_ENV === "production") {
      Fathom.load()
      Fathom.setSiteId("ZWCPJCUA")
      Fathom.trackPageview()
    }
  })

  return <Component {...pageProps} />
}