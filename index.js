const http = require('http')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const server = http.createServer()

const text = 'hello world'

server.on('request', (request, response) => {
  const element = React.createElement('p', null, text)
  const str = ReactDOMServer.renderToString(element)
  response.end(str)
})

server.listen(3000)
