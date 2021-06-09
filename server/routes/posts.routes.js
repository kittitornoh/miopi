const express = require('express');

// router
const router = express.Router();

// controller
const controller = require('../controllers/posts.controller');

// middleware
// #TODO: add auth middleware

// routes ----------------------------------------------------------------

// get all posts
router.get('/', controller.getAllPosts);

// get all posts of a single user
router.get('/user/:userId', controller.getMyPosts);

// create a new post
router.post('/', controller.createPost);

// delete a post
router.delete('/:postId', controller.deleteMyPost);

module.exports = router;
