import React from 'react'
import { styled } from '../gatsby-theme-stitches/stitches.config'

import Layout from '../components/Layout'

const Test = styled('div', {
    backgroundColor: 'gainsboro',
    fontFamily: 'system-ui',
    padding: 8,
    userSelect: 'none'
})

const index = () => {
    return (
        <Layout>
            <Test>hi</Test>
        </Layout>
    )
}

export default index