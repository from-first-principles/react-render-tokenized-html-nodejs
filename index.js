const DOMParser = require('xmldom').DOMParser
const http = require('http')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

// String -> [React.Element]
function tokenizeText (text) {
  const style = {backgroundColor: 'LightGrey'}
  return text
    .split(/\s+/)
    .map((token, key) => {
      return React.createElement('span', {key, style}, token)
    })
}

function intersperse (text, delimiter) {
  return [].concat(...text.map(t => [delimiter, t])).slice(1)
}

// Node -> [{attrName: attrValue}] | null
function getNodeAttributes (node) {
  const attrs = node.attributes
  if (attrs && attrs.length) {
    return Array.from(attrs).reduce((result, attr) => {
      result[attr.name] = attr.value
      return result
    }, {})
  }
  return null
}

// Node -> React.Element
function processNode (node) {
  const {nodeName, childNodes} = node
  if (nodeName === '#text') {
    return intersperse(tokenizeText(node.nodeValue), ' ')
  }
  else {
    const attrs = getNodeAttributes(node)
    const content = childNodes ? Array.from(childNodes).map(processNode) : []
    return React.createElement(nodeName, attrs, ...content)
  }
}

// String -> Document
function parseHTMLString (html) {
  return new DOMParser().parseFromString(html, 'text/html')
}

// String -> [React.Element]
function tokenizeHTML (html) {
  const doc = parseHTMLString(html)
  return Array.from(doc.childNodes).map(processNode)
}

function requestHandler (request, response) {
  const html = '<div><h1>hello</h1><p class="main" id="my">beautiful world</p></div>'
  const tokenized = tokenizeHTML(html)
  const result = tokenized.length == 1
    ? tokenized[0]
    : React.createElement('div', null, ...tokenized)
  const str = ReactDOMServer.renderToString(result)
  response.end(str)
}

const server = http.createServer()
server.on('request', requestHandler)
server.listen(3000)
