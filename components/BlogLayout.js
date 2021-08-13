import Link from 'next/link'
import * as Fathom from 'fathom-client'

export default function BlogLayout({ children }) {
    return (
        <div className="md:grid p-4 md:pt-12 pb-24 gap-8 grid-cols-[1fr,minmax(0,65ch),1fr]">
            <div className="justify-self-end mt-1 flex justify-between md:block">
                <p>
                    <Link href="/">
                        <a className="font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200">
                            Ben&nbsp;Borgers
                        </a>
                    </Link>
                </p>
                <p>
                    <a
                        href="https://twitter.com/benborgers"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => Fathom.trackGoal('E3LD3YS1', 0)}
                    >
                        ⇢ Twitter
                    </a>
                </p>
            </div>

            <div className="mt-4 md:mt-0">
                {children}
            </div>
        </div>
    )
}
