import fetch from 'node-fetch'
import React, { useEffect } from 'react'
import { Link, useLocation } from '../components/Router'

export default () => {
    const { pathname } = useLocation()

    useEffect(() => {
        fetch('https://friede.gg/api/sheets/append', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: '1bq41L9JuxWzsx_xdxGLamLg0vlhZSMA8Tijr-tbBb0w',
                sheet: 'Sheet',
                rows: [{
                    Timestamp: (new Date()).toLocaleString('en-US'),
                    Path: pathname
                }]
            })
        })
            .then(res => res.text())
            .then(json => console.log(json))
    })

    return (
        <div className="p-4 sm:p-8 text-center">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">page not found — sorry!</h1>
            <div>
                <Link to="/" className="text-rose-600 underline font-semibold">back to the homepage</Link>
            </div>
        </div>
    )
}
