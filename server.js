const express = require('express')
const next = require('next')

const publicRuntimeConfig = require('./next.config').publicRuntimeConfig

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

/* handlers */
function usePrefixHandler(request, response, next) {
  const paths = new RegExp(`^${publicRuntimeConfig.pathPrefix}/(static|_next)/(.*)`)
  request.url = request.originalUrl.replace(paths, '/$1/$2')
  return next()
}

function useSsrHandler(request, response, next) {
  return handle(request, response)
}

const paths = new RegExp(`^${publicRuntimeConfig.pathPrefix}`)

app.prepare().then(() => {
  const server = express()

  server.get(paths, usePrefixHandler)
  server.get('*', useSsrHandler)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
