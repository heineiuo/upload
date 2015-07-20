/**
 * Create by Hansel on 2015-05-26 23:29:00
 */

var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

/**
 * Define model instance.
 * @type {Model|*}
 */

var Config = mongoose.model('Config');

exports.renderIndex = function(req, res){

  res.render('index', {
    vars: express.appconf.vars
  })

};