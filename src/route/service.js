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

  app.route('/service/register')
    .post(user.signup) //ע��

  app.route('/service/login')
    .post(user.login) //��¼

  app.route('/service/reset-pasword')
    .post(user.resetPassword) // ��������

  app.route('/service/logout')
    .get(user.logout) // �˳���¼

  app.route('/service/app-authorize/:appId')
    .post(appcontroller.authorize) //��Ȩ
    .delete(appcontroller.deleteAuthorize) //ȡ����Ȩ

}