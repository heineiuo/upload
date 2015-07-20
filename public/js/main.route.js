var mainApp = purple('mainApp');

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
});