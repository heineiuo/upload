/**
 * Created by Hansel on 2015-7-17 14:19:47
 */


var mongoose = require('mongoose')

var isConnected = false

module.exports.connect = function(db){

  connect(0)

  /**
   * connect mongodb.
   * @param {number} delay
   */
  function connect(delay) {


    if (!isConnected) {

      setTimeout(function(){
        mongoose.connect(db.uri, db.options, function(err) {
          if(err){
            console.log(err)
            console.error("DB connected fail, connect again after "+db.delay/1000+" second")
            isConnected = false
            mongoose.connection.close()
            connect(db.delay)
          } else {
            console.log("DB connected success on "+db.uri)
            isConnected = true
            mongoose.connection.once("disconnected", function(){
              console.error('DB disconnected, trying to connect again...')
              isConnected = false
              connect(0)
            })
          }
        })
      }, delay)
    }
  }
}

module.exports.isConnected = function(){
  return isConnected
}