/**
 * Create by Hansel on 2015-05-26 23:01:56
 */

var mongoose = require('mongoose');
var express = require('express');
var Schema = mongoose.Schema;
var _ = require('lodash');

var ConfigSchema = new Schema({
  id: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  content: {
    type: Object,
    default: {}
  },

  stamp: {
    type: Number,
    default: 0
  }

});

mongoose.model('Config', ConfigSchema);

