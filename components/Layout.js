export default function Layout({ MDXComponent, frontmatter }) {
    return (
        <div className="p-4 pb-32 sm:px-6 sm:pt-24 max-w-prose mx-auto">
            <div className="mb-12">
                <h1 className="text-gray-800 font-black text-3xl">{frontmatter.title}</h1>
            </div>

            <div className="prose prose-rose">
                <MDXComponent />
            </div>
        </div>
    )
}
