/*! PURPLE.js v0.6.0-SNAPSHOT 2015-06-12 */
(function (global) {

  if ( typeof define === "function" && define.amd ) {
    define(function () {
      return factory(global)
    })
  } else {
    global.purple = factory(global)
  }

  function factory(global) {
;/**
 * __purple
 * @api private
 */
var __purple = {
  debug: null,
  app: {
    __anonymous: {}
  },
  mainApp: null,
  startable: false,
  startup: []
};


/**
 * Create or return an App.
 *
 * @param {string} name
 * @returns {*}
 */
function purple (name) {

  if (typeof name == 'function') {
    __purple.debug = name;
    return false;
  }

  // 如果没传入name，返回主app或者匿名app
  if (arguments.length === 0 ) {
    if (__purple.conf.mainApp !== null) {
      return __purple.app[__purple.conf.mainApp]
    } else {
      return __purple.app.__anonymous
    }

  // 否则，返回已建立的app，或者建立app
  } else {
    if (isDefined(__purple.app[name])) {
      return __purple.app[name]
    } else {
      return newApp(name)
    }
  }

}


/**
 * @param {string} name
 * @returns {Object} app
 * @api private
 *
 */
function newApp (name) {


  var app = __purple.app[name] = {

    name: name,

    // 中间件
    middleware: [],

    // 路由集合
    list: {},

    // 配置
    conf: {
      filter: "/",
      timeout: 45000,
      onpopstate: false,
      onanchorclick: false
    },

    state: "complete", // pending, complete

    /**
     * current url.
     */
    currentHref: null,

    /**
     * prev url.
     */
    prevHref: null,

    listen: function() {
      var _thisApp = this;
    },

    /**
     * Set app config.
     */
    set: function(name, conf) {
      var _thisApp = this;

      if(name == 'onpopstate') {
        if (_thisApp.conf.onpopstate && !conf) {
          window.removeEventListener('popstate', popstateHandle, false);
        }
        if (!_thisApp.conf.onpopstate && conf) {
          window.addEventListener('popstate', popstateHandle, false);
        }
      }
      if (name == 'onanchorclick'){
        if(_thisApp.conf.onanchorclick && !conf){
          document.removeEventListener('click', anchorclickHandle, false);
        }
        if(!_thisApp.conf.onanchorclick && conf) {
          document.addEventListener('click', anchorclickHandle, false);
        }
      }

      _thisApp.conf[name] = conf;

      function popstateHandle(event){
        _thisApp.go(location.href)
      }

      function anchorclickHandle(evnet){
        _thisApp.go(getanchorhref(event))
      }

    },

    /**
     * Get app config.
     * @param {string} name
     * @return {string|object}
     */
    get: function(name){
      return this.conf[name]
    },

    /**
     * Add middleware for app.
     * @param {function} fn
     * @api public
     */
    use: function (fn) {
      app.middleware.push(fn)
    },


    /**
     * Define a router and output a `get` method.
     *
     * @param {string|regex|Array} rawHref
     * @returns {object}
     * @api public
     */
    route: function(rawHref) {
      // 判断href是否合法
      var href;

      if (isArray(rawHref)) {
        href = new RegExp('^\/'+rawHref.join('\/')+'\/$')
      } else if (isString(rawHref)) {
        href = new RegExp('^'+rawHref+'$')
      } else if (isRegExp(rawHref)){
        href = rawHref
      } else {
        // todo error handle
        return false
      }

      var appHref = app.list[href] = {
        regexp: href,
        get: function () {
          appHref.fns = Array.prototype.slice.call(arguments,0)
        }
      };

      return appHref
    },

    /**
     * Core method. Change the route state.
     * @param {string} href
     * @param {string} type
     * @api public
     */
    go: function(href, type){

      if (href == null) {
        return false;
      }

      var _thisApp = this;
      if (_thisApp.state == 'pending') {
        return false;
      }

      _thisApp.state = 'pending';

      var req = extend(parseurl(href), {
        _end: false, // 跳转是否结束
        rawUrl: href, // 原始请求连接
        historyStateType: type || 'push' // 堆栈方式
      });

      var res = {
        timestamp: Date.now(),

        prevView: null,

        end: function () {
          _thisApp.state = 'complete';
          req._end = true;
          if(this.prevView != null) {
            this.prevView.remove()
          }
          debug(null, '路由跳转完毕...');
        }
      };

      // 使用中间件
      var flow = [findRoute].concat(app.middleware);

      next();

      function next (err) {
        if (!req._end) {
          if (flow.length > 0) {
            flow.shift()(req, res, next)
          } else {
            res.end()
          }
        }
      }

      /**
       * 查找路由器
       */
      function findRoute(req, res, next) {
        if (req.historyStateType == 'replace') {
          history.replaceState('data', 'title', req.parsedURL)
        } else {
          history.pushState('data', 'title', req.parsedURL)
        }
        debug(null, '正在解析地址：'+req.rawUrl);

        // 判断href是否合法
        // 判断href是否在list中
        for(var key in app.list) {
          if (app.list.hasOwnProperty(key)) {
            if (app.list[key].regexp.test(req.pathname)) {
              debug(null, '解析路由成功：'+app.list[key].regexp);
              flow = flow.concat(app.list[key].fns);
              return next()
            }
          }
        }

        /**
         * 不在filter范围内，跳转页面。
         */
        if (!new RegExp(req.app.conf.filter).test(req.pathname)){
          return location.replace(req.rawUrl);
        }

        debug(null, '该地址无法解析：' + req.pathname);
        // todo 404
        res.end()
      }

    },

    /**
     * History Back.
     */
    back: function(){
      // 后退一步
      history.back()
    }


  };

  return app
}


/**
 * 获取被点击a标签的链接
 * @param event
 * @returns href
 */
function getanchorhref(event){

  // onanchorclick
  var href = null;
  r(event.target);
  if (href !== null) {
    event.preventDefault();
  }

  return href;

  /**
   * Find closest anchor href.
   * @param dom
   * @api private
   */
  function r(dom) {
    if (dom == null) {
      href = null
    } else if (dom.nodeName == 'A') {
      href = dom.href || null
    } else  {
      r(dom.parentNode)
    }
  }


}

/**
 * URL 解析
 * 2014-05-27 13:24:33

 source == origin+pathname+search+hash
 source == origin+relative
 source == protocol+hostname+port+relative

 search即从origin后的第一个?开始，到第一个#号之前
 hash从第一个#开始，一直到结束

 所以先判断hash，将href中的hash成分去除
 再判断search，只要看看还有没有?号即可
 剩下的就是origin+pathname了

 如果origin不是当前的origin，则用location.replace(source)进行跳转。

 */
function parseurl(url) {
  var a =  document.createElement('a');
  a.href = url;


  /**
   * IE下，a.pathname是不显示第一个字符'/'的，
   * 这会导致'/'这种url获取不到真实的pathname（会显示空字符）
   * 所以修正下，手动加上'/'
   */
  var ppx = a.pathname || '/'+ a.pathname;

  var result = {
    rawUrl: a.href,
    href: a.href,
    origin: a.origin,
    source: url,
    protocol: a.protocol.replace(':',''),
    hostname: a.hostname,
    port: a.port,

    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], //  除去origin之外的全部

    // pathname string
    pathname: ppx.replace(/^([^\/])/,'/$1'),

    // pathnames array
    pathnames: clean(a.pathname.replace(/^\//,'').split('/'),''),

    // search string
    search: a.search,

    // searches  key-value
    searches: (function(){
      var ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),

    /**
     * hash字符串+关联数组
     */
    hash: a.hash.replace('#',''),
    hashes: clean(a.hash.replace(/^(#)*/i,'').replace(/^\//,'').split('/'),''),

    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1]
  };



  var parsedURL = String();
  parsedURL += '/'+result.pathnames.join('/');


  if(!isEmpty(result.searches)){
    parsedURL += String('?');
    for (var x in result.searches) {
      if (result.searches.hasOwnProperty(x)){
        parsedURL += x + '=';
        parsedURL += ('undefined' != typeof result.searches[x]) ? result.searches[x]: '';
        parsedURL += '&'
      }
    }
    parsedURL = parsedURL.substring(0, parsedURL.length-1)
  }


  if (result.hashes.length>0) {
    parsedURL += '#';
    for (var i = 0; i < result.hashes.length; i++) {
      if (i<result.hashes.length-1) {
        parsedURL += result.hashes[i] + String('/')
      } else {
        parsedURL += result.hashes[i]
      }
    }
  }


  result.parsedURL = parsedURL;

  return result
}

;function debug(err, debug) {
  if (__purple.debug == null) {
    if (err) {
      console.error(err, debug);
    } else {
      console.log(debug);
    }
  } else {
    __purple.debug(err, debug);
  }
};function isDefined(arg) {
  return typeof arg != 'undefined'
}

function isString(arg) {
  return typeof arg == 'string'
}

function isArray(arg) {
  return arg instanceof Array
}

function isRegExp(arg) {
  return arg instanceof RegExp
}

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

function map(obj, callback) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof callback === 'function') {
        result[key] = callback.call(obj, obj[key], key, obj);
      }
    }
  }
  return result;
}

function indexOf(arr, value, fromIndex) {
  return arr.indexOf(value, fromIndex)
}

/**
 * Extend multi objects.
 * @returns {object}
 */
function extend() {
  var result = {};
  var objs = Array.prototype.slice.call(arguments,0);
  objs.forEach(function(props, index){
    for(var prop in props) {
      if(props.hasOwnProperty(prop)) {
        result[prop] = props[prop]
      }
    }
  });
  return result;
}


/**
 * Ready? start!
 * @api public
 */
function ready(start) {
  /**
   * Start after document loaded.
   */
  if (document.readyState == "complete"){
    start();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        document.onreadystatechange = null;
        start();
      }
    };
  }
}

/**
 * Clean.
 * @param arr
 * @param del
 * @returns {Array}
 */
function clean(arr, del) {
  var result = [];
  arr.forEach(function(value){
    if (value !== del){
      result.push(value)
    }
  });
  return result;
}
;
  return purple;


} // END factory

})(this);