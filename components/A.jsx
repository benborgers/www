import Link from 'next/link'

export default function A({ href, children }) {
    if(href.startsWith('/')) {
        return (
            <Link href={href}>
                <a>
                    {children}
                </a>
            </Link>
        )
    }

    return (
        <a href={href}>
            {children}
        </a>
    )
}
