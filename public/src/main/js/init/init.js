/**
 * Create by Hansel on 2015-07-08 00:26:32.
 */

var ENV = {
  ajax_base_url: '/api'
}


var app = purple({
  spa: false
})

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


$(function(){
  app.go(location.href)
})