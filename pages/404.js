import CustomHead from 'components/CustomHead'

// macOS-inspired design inspired by https://mad.ac

export default function Custom404() {
    return (
        <>
            <CustomHead title="Not Found" />

            <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-200 to-red-200 flex items-start sm:items-center justify-center p-6">
                <div className="bg-white w-full max-w-sm rounded-xl shadow-lg sm:mb-36 overflow-hidden">
                    <div className="bg-gray-100 border-b border-gray-200 py-2 px-3 flex items-center justify-between">
                        <a href="/">
                            <div className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-600 transition-colors duration-200" />
                        </a>
                        <p className="font-mono text-gray-400 text-center text-sm font-semibold">404.html</p>
                        {/* Div for spacing on right side. */}
                        <div className="w-3" />
                    </div>
                    <div className="p-4 pb-6">
                        <h1 className="text-lg font-black text-gray-900">Page Not Found</h1>
                        <div className="mt-2 text-gray-600">
                            <p>Sorry about that. You’ll probably be able to find it in the list of blog posts though:</p>

                            <a href="/posts">
                                <div className="flex space-x-2 items-center mt-4 bg-gray-100 py-2 px-3 rounded-md justify-between text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200">
                                    <span>All Posts</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
