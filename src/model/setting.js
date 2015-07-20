/**
 * œµÕ≥…Ë÷√
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var _ = require('lodash')


var SettingSchema = new Schema({

  name: {
    type: String,
    default: ''
  }

})


mongoose.model('Setting', SettingSchema)
