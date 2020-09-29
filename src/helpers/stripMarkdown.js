const stripMarkdown = text => {
    return text
        .replace(/\*|_/g, '')
        .replace(/\n/g, ' ')
        .replace(/ +/g, ' ')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1');
}

export default stripMarkdown
