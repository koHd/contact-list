var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res) {
  req.session.reset();
  res.redirect('/');
})

module.exports = router;
