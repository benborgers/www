/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import * as Fathom from 'fathom-client'

export default function BlogLayout({ children }) {
    return (
        <div className="md:grid p-4 md:pt-12 pb-24 gap-x-10 grid-cols-[1fr,minmax(0,65ch),1fr]">
            <div className="justify-self-end mt-1 flex justify-between md:block">
                <p className="mb-1">
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
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                        onClick={() => Fathom.trackGoal('E3LD3YS1', 0)}
                    >
                        <img src="https://emojicdn.elk.sh/🐦" alt="🐦" className="h-4" />
                        <span>Twitter</span>
                    </a>

                    <a
                        href="mailto:ben@elk.sh"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <img src="https://emojicdn.elk.sh/📨" alt="📨" className="h-4" />
                        <span>ben@elk.sh</span>
                    </a>
                </p>
            </div>

            <div className="mt-4 md:mt-0">
                {children}
            </div>
        </div>
    )
}
