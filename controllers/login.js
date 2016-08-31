var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');

router.get('/', function(req, res) {
  res.render('login', {error: req.session.error});
});

router.post('/', function(req, res) {
  // asynchronous http request to users-api
  var options = {
    hostname: 'localhost',
    port: 8000,
    path: '/users/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  var restRequest = http.request(options, function(restResponse) {
    var body = '';
    restResponse.setEncoding('utf8');
    restResponse.on('data', function(chunk) {
      body += chunk;
    })
    restResponse.on('end', function() {
      if (restResponse.statusCode === 200) {
        var user = JSON.parse(body);
        console.log("Creating new session for user " + user.username);
        req.session.user = user;
        res.redirect('/contacts');
      } else {
        req.session.error = 'Incorrect username or password';
        res.redirect('/login');
      }
    });
  });
  restRequest.on('error', function(err) {
    console.log("Problem with request: " + err);
  });
  restRequest.write(querystring.stringify(req.body));
  restRequest.end();
});

module.exports = router;
