const http = require('http')
const {listHandler, scanHandler, downloadStateHandler} = require('./handlers')

const router = {
  '/list': {
    'GET': listHandler
  },
  '/scan': {
    'POST': scanHandler
  },
  '/download-state': {
    'GET': downloadStateHandler
  }
}

const notFoundHandler = (req, res) => {
  res.writeHead(404, 'Not Found').end()
}

const server = http.createServer(async (req, res) => {
  const handler = router[req.url] && router[req.url][req.method] || notFoundHandler
  await Promise.resolve(handler(req, res))
})

server.on('clientError', (err, socket) => {
  console.error(err)
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

module.exports = {
  server
}
