var index = {};

index.renderIndex = function(req, res, next){

  $('#view-scope').html(JST['layout-main']())

  next();

};