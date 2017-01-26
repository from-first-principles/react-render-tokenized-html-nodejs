const http = require('http')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const server = http.createServer()

function tokenizeText (text) {
  return text
    .split(/\s+/)
    .map(token => {
      return React.createElement('span', null, token)
    })
}

function intersperse (text, delimiter) {
  return [].concat(...text.map(t => [delimiter, t])).slice(1)
}

server.on('request', (request, response) => {
  const text = 'hello beautiful world'
  const children = intersperse(tokenizeText(text), ' ')
  const element = React.createElement('p', null, ...children)
  const str = ReactDOMServer.renderToString(element)
  response.end(str)
})

server.listen(3000)
