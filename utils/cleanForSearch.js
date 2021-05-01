// Strips down strings for search purposes.

module.exports = string => {
    return string
        .toLowerCase()
        .replace(/\n/g, '')
        .replace(/[^a-z0-9]/g, '')
}
