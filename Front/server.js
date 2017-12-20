#!/usr/bin/env node
const proxy = require('express-http-proxy')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

function restProxy () {
  let options = {
    filter: function (req) {
      return req.method == 'GET' || req.method == 'POST'
    },
    proxyReqPathResolver: function (req) {
      let url = 'http://localhost:8080'
      url += req.originalUrl
      return url
    },
  }
  return proxy('http://localhost:8080', options)
}
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use('/', express.static(__dirname))
app.use('/', restProxy())
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})