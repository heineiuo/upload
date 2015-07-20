/**
 * Ӧ��
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');


var FileSchema = new Schema({

  path: String, // /13hjk4jk1h3k1209adf8ga.jpg
  hostId: String, // 8hgk76813khk12397123
  hostAlias: String, // http://static1.heineiuo.com
  SmileId: String


});


mongoose.model('File', FileSchema);

