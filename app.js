var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var http = require('http');
var contactsController = require('./controllers/contacts');
var loginController = require('./controllers/login');
var logoutController = require('./controllers/logout');

var app = express();

// middleware
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  cookieName: 'session',
  secret: 'a6dfa65fk83kj8nfakd!2ijl;a;0q',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// routing

// redirect non-logged in user to login
function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

app.get('/', requireLogin, function (req, res) {
  res.redirect('/contacts');
});

app.use('/contacts', requireLogin, contactsController);
app.use('/login', loginController);
app.use('/logout', requireLogin, logoutController);

app.listen(8001, function() {
  console.log("App is listening on port 8001");
});

module.exports = app;
