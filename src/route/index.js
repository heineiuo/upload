/**
 * Create by Hansel on 15/5/22.
 *
 */

var express = require('express')
var path = require('path')

/**
 * Require controller
 */

var index = require(path.join(__dirname, '../controller/index'))
var user = require(path.join(__dirname, '../controller/user'))


/**
 * Export.
 * @param {object} app
 */

module.exports = function(app){


  app.route(['/', '/app', '/people', '/i',
    '/login', 'register','/reset-pasword', '/app/:appId',
    '/app/:appId', '/search', '/signup', '/register'
  ])
    .get(index.renderIndex)


  app.route('/robots.txt')
    .get(index.renderRobots)



}

