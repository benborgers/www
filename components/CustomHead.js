import Head from 'next/head'

export default function CustomHead({ title, children = null }) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            {process.env.NODE_ENV === 'production' &&
                <script src="https://anteater.benborgers.com/script.js" data-site="ZWCPJCUA" defer></script>
            }

            {children}
        </Head>
    )
}
