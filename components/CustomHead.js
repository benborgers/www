import Head from 'next/head'

export default function CustomHead({ title, children = null }) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="https://emojicdn.elk.sh/🐙" />

            {children}
        </Head>
    )
}
