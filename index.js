const http = require('http')
const React = require('react')

const server = http.createServer()

server.on('request', (request, response) => {
  response.end('hello world')
})

server.listen(3000)
