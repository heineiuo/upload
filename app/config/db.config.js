/**
 * Create by Hansel on 2015-05-27 20:03:17
 *
 * @type {{uri: string, options: {}}}
 */


var uri = "mongodb://localhost:27017/env001";
var options = {
  user: '',
  pass: '',
  server: {
    socketOptions: {
      keepAlive: 1
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1
    }
  }
};

module.exports.db = {
  uri: uri,
  options: options
};
