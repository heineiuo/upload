
// api v0.3.1
var apiurl = {
  "login": [1, 'GET',  "/login"],
  "register": [1, 'GET',  "/register"]
};

var AJAX_BASE_URL = ENV.development?ENV.ajax_base_url_dev:ENV.ajax_base_url

var _ajax = {};

_.map(apiurl, function(val, key){
  _ajax[key] = assemAjax(val);
});

function ajax(name, data, callback) {
  if (typeof _ajax[name] == 'undefined'){
    return console.warn('ajax方法未找到')
  }
  if (arguments.length == 1){
    return _ajax[name]
  } else {
    _ajax[name].data(data).exec(callback)
  }
}

function assemAjax(val){

  return {
    param: function(param){
      this._param = param;
      return this
    },

    data: function(data){
      this._data = _.extend(this._data, data)
      return this
    },

    exec: function (callback){
      var url  = AJAX_BASE_URL+val[2];
      var dataType = val[3] || 'json'

      if (this._param != null) {
        url += '/'+this._param
      }

      $.ajax({
        url: url,
        type: val[1],
        data: this._data,
        dataType: dataType
      })
        .done(function(body){
          if (dataType == 'json' && typeof body.error != 'undefined') {
            callback(body.error, body)
          } else {
            callback(null, body)
          }
        })
        .fail(ajaxFailHandle);

      this._param = null;
      this._data = {};
    },

    _data: {},
    _param: null

  }

}

/**
 * 统一ajax错误处理函数
 * @param xhr
 */
function ajaxFailHandle(xhr) {
  var $modalWrap = $('#view-modals').length == 0?$('#view-scope'):$('#view-modals')
  $modalWrap.html(JST['modal/ajax-fail']())
  $('#ajax-fail-modal').modal('show')
  $('.btn-reload').on('click', function(){
    location.reload()
  })
}