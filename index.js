/**
 * Created by Hansel on 15/5/22.
 */

var path = require('path')
var app = require(path.join(__dirname, './src/index'))({
  "port": 8222,
  "name": "Upload"
})