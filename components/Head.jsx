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
                content={`https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fp%3D2gMuPD4KICA8Qm94CiAgICBzeD17ewogICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjlGQUZCJywKICAgICAgcGFkZGluZzogNzIKICAgIH19CiAgPgogICAgPExpbmsKICAgICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M_ZmFtaWx5PUludGVyOjcwMCZkaXNwbGF5PWJsb2NrJwogICAgICByZWw9J3N0eWxlc2hlZXQnCiAgICAvPgogICAgPEZsZXgKICAgICAgc3g9e3sKICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsCiAgICAgICAgaGVpZ2h0OiAnMTAwJScKICAgICAgfX0KICAgID4KICAgICAgPEJveAogICAgICAgIHN4PXt7CiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsCiAgICAgICAgICBweTogMjQsCiAgICAgICAgICBweDogMzYsCiAgICAgICAgICBib3JkZXJSYWRpdXM6IDgsCiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI0QxRDVEQicKICAgICAgICB9fQogICAgICA-CiAgICAgICAgPFRleHQKICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgIGZvbnRTaXplOiAzNiwKICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLAogICAgICAgICAgICBmb250RmFtaWx5OiAnSW50ZXInLAogICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLAogICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLAogICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjMKICAgICAgICAgIH19CiAgICAgICAgPgogICAgICAgICAge3F1ZXJ5LnRpdGxlfQogICAgICAgIDwvVGV4dD4KICAgICAgPC9Cb3g-CiAgICA8L0ZsZXg-CiAgPC9Cb3g-CjwvPg%26title%3D${encodeURIComponent(title || 'Ben Borgers')}`}
            />

            {process.env.NODE_ENV === 'production' &&
                <script src="https://anteater.benborgers.com/script.js" data-spa="auto" data-site="ZWCPJCUA" defer></script>
            }
        </Head>
    )
}
