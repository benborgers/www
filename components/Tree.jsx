import Link from 'next/link'
import { FolderIcon } from '@heroicons/react/outline'
import mdxData from '../data/mdx'

function Layer({ files, top = false }) {
    if(Array.isArray(files)) {
        return (
            <div className="ml-7 space-y-1">
                {files.map(slug => (
                    <div key={slug}>
                        <Link href={`/${slug}`}>
                            <a>
                                <div className="text-gray-600 underline hover:text-rose-600 transition-colors font-normal">
                                    {mdxData.find(post => post.slug === slug).title}
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        )
    } else {
        const folders = Object.keys(files)
        return (
            <div className={`${top ? '' : 'ml-8'}`}>
                {folders.map(folderName => (
                    <div key={folderName} className="mb-4">
                        <div className="flex items-center space-x-2 mb-1">
                            <FolderIcon className="h-5 text-gray-400" />
                            <span className="text-gray-800 font-bold">{folderName}</span>
                        </div>

                        <Layer files={files[folderName]} />
                    </div>
                ))}
            </div>
        )
    }
}

export default function Tree({ files }) {
    return <Layer files={files} top={true} />
}
