/**
 * Create by Hansel on 2015-06-07 14:50:27.
 */

var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var regex = {
  username: /[0-9a-z]{8,16}/,
  password: /[0-9]{8,16}/,
  email: /[0-9]{10,20}/
};

exports.username = function(username){

  return true

};

exports.password = function(pass) {

  return true

};

exports.email = function(email){

  return true

};