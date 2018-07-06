const http = require('http')
const https = require('https')
const url = require('url')
const fs = require('fs')
const { StringDecoder } = require('string_decoder')
const { initializeMongoConnection } = require('./mongoConfig')
const { ping, notFound, users } = require('./routeHandlers')

const router = {
  ping,
  notFound,
  users
};

const httpsCerts = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
}

const httpServer = http.createServer((req, res) => initialRequestHandler(req, res))
const httpsServer = https.createServer(httpsCerts, (req, res) => initialRequestHandler(req, res))

function initialRequestHandler(req, res) {
  const urlObject = url.parse(req.url, true)
  const requestedResource = urlObject.pathname.replace(/^\/+|\/+$/g, '')
  const parsedQueryString = urlObject.query
  const method = req.method.toUpperCase()
  const headers = req.headers
  const decoder = new StringDecoder('utf8')

  let payload = ''

  req.on('data', data => payload += decoder.write(data))
  req.on('end', () => {
    payload += decoder.end()

    const actionHandler = ( typeof(router[requestedResource]) !== 'undefined' ? router[requestedResource] : router.notFound )
    const bundledData = {
      requestedResource,
      parsedQueryString,
      method,
      headers,
      payload
    }

    actionHandler(bundledData, (statusCode, responseData) => {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(JSON.stringify(responseData))

      console.log(`${ method } ${ requestedResource }\n`, statusCode, responseData)
    })
  })
}

(function main() {
  initializeMongoConnection()
  httpServer.listen(8080, () => console.log('HTTP listening on port 8080'))
  httpsServer.listen(8081, () => console.log('HTTPS listening on port 8081'))
})()
