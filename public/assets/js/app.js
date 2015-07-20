/*! app.js v0.0.0-SNAPSHOT 2015-06-12 */
;var mainCtrl = {
  renderHome: function(req, res){

    $('body').append('hello world')

    res.end()
  },


};

mainCtrl.renderGame = function(req, res){

  $('body').append('game')
  res.end();
};;var mainApp = purple('mainApp');

/**
 * 监听a链接点击和前进后退
 */
mainApp.set('onanchorclick', true);
mainApp.set('onpopstate', true);
mainApp.set('isMain', true);

/**
 * 路由器
 */
mainApp.route('/').get(mainCtrl.renderHome);
mainApp.route('/game').get(mainCtrl.renderGame);


$(document).ready(function(){
  mainApp.go('/');
});;
