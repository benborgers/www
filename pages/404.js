import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../components/Head'

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        fetch('https://friede.gg/api/sheets/append', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: '1bq41L9JuxWzsx_xdxGLamLg0vlhZSMA8Tijr-tbBb0w',
                sheet: 'Sheet',
                rows: [{
                    Timestamp: (new Date()).toLocaleString('en-US'),
                    Path: router.asPath
                }]
            })
        })
    }, [])

    return (
        <>
            <Head title="Not Found" />

            <div className="p-4 sm:p-8 text-center">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">page not found — sorry!</h1>
                <div>
                    <Link href="/">
                        <a className="text-rose-600 underline font-semibold">back to the homepage</a>
                    </Link>
                </div>
            </div>
        </>
    )
}
