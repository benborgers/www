import Head from 'next/head'

export default function HeadComponent({ title, description = null }) {
    return (
        <Head>
            <title>{title ? title + ' - ' : ''}Ben Borgers</title>
            <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            {description && <meta name="description" content={description} />}

            <meta
                property="og:image"
                content={`https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dvercel%26p%3D2gI4PEJveAogIHN4PXt7CiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjlGQUZCJwogIH19Cj4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M_ZmFtaWx5PUludGVyOjUwMCw4MDAmZGlzcGxheT1ibG9jaycKICAgIHJlbD0nc3R5bGVzaGVldCcKICAvPgogIDxGbGV4CiAgICBzeD17ewogICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLAogICAgICBoZWlnaHQ6ICcxMDAlJwogICAgfX0KICA-CiAgICA8Qm94CiAgICAgIHN4PXt7CiAgICAgICAgd2lkdGg6ICc4MCUnCiAgICAgIH19CiAgICA-CiAgICAgIDxUZXh0CiAgICAgICAgc3g9e3sKICAgICAgICAgIGZvbnRTaXplOiA0OCwKICAgICAgICAgIGNvbG9yOiAnJywKICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCwKICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMywKICAgICAgICAgIGZvbnRGYW1pbHk6ICdJbnRlcicKICAgICAgICB9fQogICAgICA-CiAgICAgICAge3F1ZXJ5LnRpdGxlfQogICAgICA8L1RleHQ-CiAgICA8L0JveD4KICA8L0ZsZXg-CjwvQm94Pg%26title%3D${encodeURIComponent(title || 'Ben Borgers')}`}
            />

            {process.env.NODE_ENV === 'production' &&
                <script src="https://anteater.benborgers.com/script.js" data-spa="auto" data-site="ZWCPJCUA" defer></script>
            }
        </Head>
    )
}
