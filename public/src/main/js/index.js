app.route('/')
  .get(index.renderIndex);

app.route('/register')
  .get(user.renderRegister)