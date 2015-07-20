var user = {}

user.renderRegister = function(req, res) {

  $('#view-scope').html(JST['layout-user']())
  $('#user-content').html(JST['user/register']())

  $('#submitReg').on('click', function(){


    ajax('register').data(data).exec(function(err, result){


    })

  })


}