/**
 * ”√ªß±Ì
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var _ = require('lodash')

var UserSchema = new Schema({

  name: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    default: ""
  },

  nickname: {
    type: String,
    default: null
  },

  registertime: {
    type: Number,
    default: 0
  },

  token: {
    type: String,
    default: ""
  }

})

mongoose.model('User', UserSchema)

