var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res) {
  console.log("Ending session for user " + req.session.user.username);
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
