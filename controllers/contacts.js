var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res) {
  var restEndPoint = 'http://localhost:8000/users/';
  http.get(restEndPoint, function(restResponse) {
     var body = '';
     restResponse.on('data', function(chunk) {
       body += chunk;
     });
     restResponse.on('end', function() {
       var obj = JSON.parse(body);
       res.render('contacts', {contacts: obj});
     });
    }).on('error', function(err) {
     console.log(err);
   });
});

router.get('/:id', function(req, res) {
  var restEndPoint = 'http://localhost:8000/users/' + req.params.id;
  http.get(restEndPoint, function(restResponse) {
     var body = '';
     restResponse.on('data', function(chunk) {
       body += chunk;
     });
     restResponse.on('end', function() {
       var obj = JSON.parse(body);
       res.render('contact', {contact: obj});
     });
    }).on('error', function(err) {
     console.log(err);
   });
});

router.get('/add-contact', function(req, res) {
  var restEndPoint = 'http://localhost:8000/users/' + req.params.id;
  // http.request() with post method
  res.render('add-contact');
});

router.get('/delete/:id', function(req, res) {
  res.render('delete-contact');
})

router.get('/edit/:id', function(req, res) {
  res.render('edit-contact');
})

module.exports = router;
