/**
 * Host
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');


var HostSchema = new Schema({

  alias: String, // http://static.heineiuo.com
  name: String, // http://182.14.12.1:8080
  path: String, // /root/web/upload/appdata/static
  size: Number // 123, means 123 MB

});


mongoose.model('Host', HostSchema);

