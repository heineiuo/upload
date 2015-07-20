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
var Gallery = mongoose.model('Gallery');
var Media = mongoose.model('Media');
var Photo = mongoose.model('Photo');
var User = mongoose.model('User');


/**
 * 获取配置信息。
 * @param req
 * @param res
 * @param next
 */
exports.list = function(req, res, next){

  res.json({error: 10001});

};

exports.tt = function(req, res, next){
  Config.create({}, function(err, config){
    if(err){
      console.log(err);
      return res.json({error: 10001});
    }
    res.json(config);
  })

};