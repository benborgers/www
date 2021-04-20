import Head from 'next/head'

export default function HeadComponent({ title, description = '' }) {
    return (
        <Head>
            <title>{title ? title + ' - ' : ''}Ben Borgers</title>
            <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            <meta
                name="description"
                content={
                    description
                        .replace(/<h[1-6].*?>.*?<\/h[1-6]>/g, '') // Remove headings
                        .replace(/<\/(p|li)>/g, ' ') // Add space between paragraphs
                        .replace(/<.+?>/g, '')
                        .replace(/\n/g, ' ')
                        .replace(/\s{2,}/g, ' ')
                        .substr(0, 250)
                        .trim()
                }
            />

            {process.env.NODE_ENV === 'production' &&
                <script src="https://anteater.benborgers.com/script.js" data-spa="auto" data-site="ZWCPJCUA" defer></script>
            }
        </Head>
    )
}
