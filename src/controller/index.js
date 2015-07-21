/**
 * Created by Hansel on 15/5/23.
 */

var express = require('express')
var path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')
var aysnc = require('async')
var _ = require('lodash')


exports.renderIndex = function(req, res){

  res.html({
    meta: [
      {name: 'viewport', content: "width=device-width, initial-scale=1, user-scalable=0, user-scalable=no"}
    ],
    lang: 'zh-CN',
    title: "Smile",
    css: ['//assets1.heineiuo.com/upload/main/index.css'],
    js: [
      '//assets1.heineiuo.com/upload/main/vendor.js',
      '//assets1.heineiuo.com/upload/main/template.js',
      '//assets1.heineiuo.com/upload/main/index.js'
    ],
    body: {
      id: "view-scope"
    }
  })

}

exports.renderRobots = function(req, res){
  res.end('deny all')
}