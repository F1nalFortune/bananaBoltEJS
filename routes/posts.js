var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET post listings */
router.get('/', function(req, res, next) {
  Post.find( function ( err, posts, count ) {
    res.render('posts', { posts: posts });
  });
});

/* POST add post */
router.post('/', function(req, res, next) {
  new Post({
    name: req.body.name,
    comment: req.body.comment,
    updated_at: Date.now()
  }).save( function(err, post, count) {
    res.redirect('/posts');
  });
});

/* GET a post */
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    res.render('post', { post: post });
  });
});


/* DELETE a post */
router.post('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    post.remove( function(err, post) {
      res.redirect('/posts');
    });
  });
});

module.exports = router;
