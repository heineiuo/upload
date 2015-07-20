/**
 * Create by Hansle on 2015-06-05 20:32:05.
 */

var path = require('path')

var dir = {
  public: path.join(__dirname, '../../public'),
  media: path.join(__dirname, '../../appdata/media'),
  logs: path.join(__dirname, '../../appdata/logs'),
  assets: path.join(__dirname, '../../public/assets')
}

module.exports = dir