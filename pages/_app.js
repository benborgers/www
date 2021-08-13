import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

import 'tailwindcss/tailwind.css'

function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        Fathom.load('ZWCPJCUA', {
            includedDomains: ['benborgers.com'],
            url: 'https://anteater.benborgers.com/script.js'
        })

        const onRouteChangeComplete = () => Fathom.trackPageview()

        router.events.on('routeChangeComplete', onRouteChangeComplete)

        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete)
        }
    })

    return <Component {...pageProps} />
}

export default App
