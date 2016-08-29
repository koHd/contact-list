var express = require('express');
var bodyParser = require('body-parser');
var contactsController = require('./controllers/contacts');

var app = express();

// middleware
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

// routing
app.get('/', function (req, res) {
  res.redirect('/contacts');
});

app.use('/contacts', contactsController);

app.listen(8001, function() {
  console.log("App is listening on port 8001");
});

module.exports = app;
