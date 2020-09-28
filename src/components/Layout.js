import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'

import '../style.css'

const Layout = ({ title, children, homepage = false }) => {
    return (
        <>
            <Helmet>
                <title>{title ? title + ' - Ben Borgers' : 'Ben Borgers'}</title>
                <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
            </Helmet>
            
            <div className="font-sans antialiased text-gray-700 max-w-2xl mx-auto p-4 pt-6 pb-16 md:pt-24">
                <Link to="/">
                    <div className="flex items-center space-x-3 mb-4">
                        {/* Pinging dot */}
                        <div className="grid">
                            <span className="row-start-1 col-start-1 w-3 h-3 bg-teal-500 rounded-full opacity-50 animate-ping"></span>
                            <span className="row-start-1 col-start-1 w-3 h-3 bg-teal-500 rounded-full"></span>
                        </div>
                        
                        <p className={`font-medium text-teal-800 ${homepage ? 'opacity-0 pointer-events-none' : ''}`}>Ben Borgers</p>
                    </div>
                </Link>
                
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout