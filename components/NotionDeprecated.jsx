export default function NotionDeprecated() {
    return (
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex space-x-5 mb-12">
            <img src="https://emojicdn.elk.sh/⚠️" className="block w-5 h-5" style={{ marginTop: 5 }} />
            <div>
                <p style={{ marginTop: 0, marginBottom: 8 }} className="font-bold text-gray-900">Heads up!</p>
                <p style={{ margin: 0 }}>
                    This post was written before Notion came out with an official API, and uses a reverse-engineering method that isn’t offically supported. Notion now has an official developer API, so you should probably <a href="https://developers.notion.so">use that instead</a>.
                </p>
            </div>
        </div>
    )
}
