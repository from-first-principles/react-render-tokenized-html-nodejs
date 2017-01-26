const http = require('http')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

function tokenizeText (text) {
  const style = {backgroundColor: 'LightGrey'}
  return text
    .split(/\s+/)
    .map(token => {
      return React.createElement('span', {style}, token)
    })
}

function intersperse (text, delimiter) {
  return [].concat(...text.map(t => [delimiter, t])).slice(1)
}

function requestHandler (request, response) {
  const text = '<h1>hello</h1><p>beautiful world</p>'
  // TODO parse html

  const children = intersperse(tokenizeText(text), ' ')
  const element = React.createElement('p', null, ...children)
  const str = ReactDOMServer.renderToString(element)
  response.end(str)
}

const server = http.createServer()
server.on('request', requestHandler)
server.listen(3000)
