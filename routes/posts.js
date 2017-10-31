var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

/* GET post listings */
router.get('/', function(req, res, next) {
  redisClient.smembers("posts", function (err, posts) {
    res.locals.posts = posts ? posts : [];
    res.render('posts');
  });
});

/* POST add post */
router.post('/', function(req, res, next) {
  redisClient.sadd("posts", req.body.name);
  res.redirect('/posts');
});

/* DELETE a post */
router.get('/delete/:name', function(req, res, next) {
  redisClient.srem("posts", req.params.name);
  res.redirect('/posts');
});

module.exports = router;
