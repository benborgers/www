const serveHandler = require('serve-handler')
const http = require('http')

http.createServer((req, res) => serveHandler(req, res, {
    public: './public'
})).listen(3000)

console.log('Now live on http://localhost:3000')
