var mainCtrl = {};

mainCtrl.renderHome = function(req, res){

  $('body').append('hello world');
  res.end();

};

mainCtrl.renderGame = function(req, res){

  $('body').append('game');
  res.end();
};