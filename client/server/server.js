const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const devProxy = {
  '/api': {
    target: 'http://localhost:4001/',
    changeOrigin: true,
  },
}

app.prepare()
.then(() => {
  const server = express();

  // setting up proxy
  if (dev && devProxy) {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    Object.keys(devProxy).forEach(function(context) {
      server.use(context, createProxyMiddleware(devProxy[context]))
    })
  }
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})