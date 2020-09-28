import React from 'react'
import { css } from '../gatsby-theme-stitches/stitches.config'
import { Helmet } from 'react-helmet'

import 'normalize.css'

css.global({
    body: { 
        fontFamily: '$sans',
        margin: 0,
        padding: 0,
        outline: 'none',
        appearance: 'none',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale'
    }
})

const Layout = ({ title, children }) => {
    return (
        <>
            <Helmet>
                <title>{title ? title + ' - Ben Borgers' : 'Ben Borgers'}</title>
                <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            </Helmet>
            
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout