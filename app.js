var express = require('express');
var bodyParser = require('body-parser');
var testController = require('./controllers/test.js');


var app = express();

// middleware
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

// routing
app.get('/', function (req, res) {
  res.render('test');
});

app.listen(8001, function() {
  console.log("App is listening on port 8001");
});
