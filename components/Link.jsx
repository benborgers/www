import NextLink from 'next/link'

export default function Link({ to, children }) {
    return (
        <NextLink href={`/${to}`}>
            <a>
                {children}
            </a>
        </NextLink>
    )
}
