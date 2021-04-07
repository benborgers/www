import React from 'react'
import { Head } from 'react-static'

export default function HeadComponent({ title }) {
    return (
        <Head>
            <title>{title ? title + ' - ' : ''}Ben Borgers</title>
            <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
    )
}
