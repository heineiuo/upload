/**
 * Created by Hansel on 2015-06-05 21:10:11.
 */

var express = require('express')
var path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')
var aysnc = require('async')
var _ = require('lodash')


/**
 * require model
 * @type {Model|*}
 */

var User = mongoose.model('User')


/**
 * 获取当前用户状态
 * @param req
 * @param res
 * @param userId
 */
exports.getUserById = function(req, res, userId){
  User.findById(Object(userId), function(err, user){
    if (err) {
      return res.json({error: 10001})
    }

    if (user==null){
      return res.json({error: 10001})
    }

    req.user = user;
    next();

  })

}

/**
 * 未登陆请求拦截
 * @param req
 * @param res
 * @param next
 */
exports.requireLogin = function(req, res, next) {

  if (req.user) {
    next()
  } else {
    res.json({error: "UNLOG"})
  }

}


/**
 * 登陆
 * @param req
 * @param res
 */
exports.login = function(req, res) {


  res.json({
    time: Date.now(),
    user: {}
  })

};

/**
 * 登出
 * @param req
 * @param res
 */
exports.logout = function(req, res) {


  res.json({
    time: Date.now(),
    user: {}
  })

};

/**
 * 创建账号
 * @param req
 * @param res
 */
exports.signup = function(req, res) {



  res.json({
    time: Date.now(),
    user: {}
  })

}


/**
 * 设置新密码
 * @param req
 * @param res
 */
exports.resetPassword = function(req, res){

  resjson({
    time: Date.now(),
    user: {}
  })
}


/**
 * 获取用户详细信息
 */
exports.getSelfProfile = function(req, res) {

  res.json(req.user)

}

/**
 * 获取好友列表
 */
exports.getFriendList = function(req, res) {
  res.json({error: "API_UNBUILD"})
}


/**
 * 获取用户基本信息（别人）
 */
exports.getOtherBasic = function(req, res) {

  res.json({error: "API_UNBUILD"})

}
