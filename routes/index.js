var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Posts' });
// });

router.get('/', function(req, res) {
  res.render('index', { user : req.user });
});

router.get('/header', function(req, res) {
  res.render('header', {} );
});


router.get('/register', function(req, res) {
  if (req.user)
    return res.back();
  res.render('register', {});
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});


router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




module.exports = router;
