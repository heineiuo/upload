/**
 * Create by Hansle on 2015-06-05 20:32:05.
 */

var path = require('path')

var dir = {
  appdata: path.join(__dirname, '../../appdata'),
  media: path.join(__dirname, '../../appdata/media'),
  logs: path.join(__dirname, '../../appdata/logs')
}

module.exports = dir