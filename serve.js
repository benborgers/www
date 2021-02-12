const serveHandler = require('serve-handler')
const http = require('http')
const { spawn } = require('child_process')

http.createServer((req, res) => serveHandler(req, res, {
    public: './public'
})).listen(3000)

console.log('http://localhost:3000')

setInterval(() => {
    spawn('npm run build', { shell: true })
}, 2000)
