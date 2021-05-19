import { useState, useEffect } from 'react'

export default function Index2() {
    const [html, setHtml] = useState('')

    useEffect(() => {
        fetch(`https://docs.google.com/document/d/e/2PACX-1vQnf1jDHD3_5ANV7H2PMIHyY-3tmmvjKV5vl2EThZZGgZm8z3iUcMYSjewsaZVdxAvF7qNMGkQeNTXx/pub?t=${new Date().getTime()}`)
            .then(res => res.text())
            .then(text => {
                const contents = text
                    .split('<div id="contents">')[1]
                    .split('<div id="footer">')[0]
                    .replace(/style="(.+?)"/g, '')
                setHtml(contents)
            })
    }, [])

    return (
        <div className="p-6 text-gray-700 antialiased">
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="wrapper max-w-screen-md mx-auto"
            />

            <style jsx global>{`
                .wrapper div {
                    padding: 0;
                    max-width: none;
                }
            `}</style>
        </div>
    )
}
