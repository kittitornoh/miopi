const express = require('express');

// router
const router = express.Router();

// controller
const controller = require('../controllers/posts.controller');

// middleware
const validateToken = require('../middleware/validateToken');

// routes ----------------------------------------------------------------

// get all posts
router.get('/', controller.getAllPosts);

// get all posts of a single user
router.get('/user/:userId', [validateToken], controller.getMyPosts);

// create a new post
router.post('/', [validateToken], controller.createPost);

// delete a post
router.delete('/:postId', [validateToken], controller.deleteMyPost);

module.exports = router;
