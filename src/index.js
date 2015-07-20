/**
 * Create by hansel on 15/5/22.
 */

var fs = require('fs');
var path = require('path');
var http = require('http');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressResHtml = require('express-res-html');

var checkDir = require(path.join(__dirname, './lib/checkdir'))
var connectDB = require(path.join(__dirname, './lib/connectdb'))

/**
 * Set global constant.
 *
 * @type {string|*}
 */
var settings = {
  dir: require(path.join(__dirname, './conf/dir')),
  db: require(path.join(__dirname, './conf/db')),
  models: require(path.join(__dirname, './conf/models')),
  routes: require(path.join(__dirname, './conf/routes'))
}

/****
 * Create app.
 *
 */
module.exports = function (options){

  settings = _.extend(settings, options)

  checkDir.check(settings.dir)

  connectDB.connect(settings.db)

  var app = express()

  app.use(function(req, res, next){
    req.settings = _.extend(settings, {isConnected: connectDB.isConnected()})
    next()
  })

  app.use(expressResHtml)

  /**
   * Parse chunk to json data.
   *
   */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  /**
   * Parse cookies.
   */
  app.use(cookieParser())

  /**
   * Load model.
   */
  for(var i=0; i<settings.models.length; i++){
    require(settings.models[i])
  }
  /**
   * Load route.
   */
  for(var i=0; i<settings.routes.length; i++){
    require(settings.routes[i])(app)
  }

  /**
   * Output static files if requested.
   */
  app.use('/media/', express.static(settings.dir.media))
  app.use('/', express.static(settings.dir.public))

  /**
   * Route not found or unexpected err.
   */
  app.use(error500Handle)
  app.use(error404Handle)

  /**
   * Listen port.
   */
  app.listen(settings.port)
  console.log('Service start success, listening on port：' + settings.port)

  return app

}


/**
 * error500 middleware
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function error500Handle (err, req, res, next) {
  if (!err) {
    return next()
  }
  res.status(500).html({
    title: "500 Internal Server Error",
    variable: [
      {error: err.stack}
    ]
  })
}


/**
 * error404 middleware
 * @param req
 * @param res
 */
function error404Handle(req, res) {
  res.status(404).html({
    title: "404 Not Found",
    variable: [
      {
        db: req.settings.db,
        url: req.originalUrl,
        error: 'Not Found'
      }
    ]
  })
}