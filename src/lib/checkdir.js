/**
 * Check directories if exist.
 * if not, create them.
 */

var mkdirp = require('mkdirp')
var _ = require('lodash')

module.exports.check = function (dirTree){

  _.each(dirTree, function(dir){
    mkdirp.sync(dir)
  })

}
