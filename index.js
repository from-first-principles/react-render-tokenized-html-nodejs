const http = require('http')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const server = http.createServer()

function tokenizeText(text) {
  return text
    .split(/\s+/)
    .map(token => {
      return React.createElement('span', null, token)
    })
}

server.on('request', (request, response) => {
  const text = 'hello world'
  const element = React.createElement('p', null, ...tokenizeText(text))
  const str = ReactDOMServer.renderToString(element)
  response.end(str)
})

server.listen(3000)
