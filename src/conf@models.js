/**
 * Models
 * @type {string[]}
 */

var path = require('path')


module.exports = [
  path.join(__dirname, '../model/host'),
  path.join(__dirname, '../model/file'),
  path.join(__dirname, '../model/user')
]