const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// models
const { Posts, Users } = require('../models');

// constants
const NUM_POST_FIELDS = 3;

/**
 * Get all posts by all users, sorted by the date they were created.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getAllPosts = async (req, res) => {
  // database query
  await Posts.findAll({
    order: [['createdAt', 'DESC']], // sort result
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

/**
 * Get single post.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getPost = async (req, res) => {
  // database query
  await Posts.findOne({
    where: {
      id: req.params.postId,
    },
  })
    .then((post) => {
      if (!post) {
        res.status(404).send({ message: 'Post not found.' });
      } else {
        res.status(200).send(post);
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

/**
 * Get all posts of a single user that is logged in.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getMyPosts = async (req, res) => {
  // database query for user
  await Users.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then((user) => {
      // check if user exists
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        // database for posts
        Posts.findAll({
          where: {
            UserId: user.id,
          },
          order: [['createdAt', 'DESC']], // sort result
        })
          .then((posts) => {
            res.status(200).send(posts);
          })
          .catch((error) => res.status(500).send({ message: error.message }));
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

/**
 * Create a new post.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createPost = async (req, res) => {
  // check for empty and or missing fields
  if (
    Object.keys(req.body).length < NUM_POST_FIELDS ||
    !req.body.title ||
    !req.body.body ||
    !req.body.userId
  ) {
    res.status(400).send({ message: 'Please provide all required fields.' });
  } else {
    // database query for user
    await Users.findOne({
      where: {
        id: req.body.userId,
      },
    })
      .then((user) => {
        // check if user exists
        if (!user) {
          res.status(404).send({ message: 'User not found.' });
        } else {
          // database query for posts
          Posts.create({
            title: req.body.title,
            body: req.body.body,
            UserId: user.id,
          })
            .then(() =>
              res.status(200).send({ message: 'Post successfully created.' }),
            )
            .catch((error) => res.status(500).send({ message: error.message }));
        }
      })
      .catch((error) => res.status(500).send({ message: error.message }));
  }
};

/**
 * Delete a logged in user's post.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteMyPost = async (req, res) => {
  // database query
  await Posts.findOne({
    where: {
      id: req.params.postId,
    },
  })
    .then((post) => {
      // check if post exists
      if (!post) {
        res.status(404).send({ message: 'Post does not exist.' });
      } else {
        // database query to destroy post
        Posts.destroy({
          where: { id: post.id },
        })
          .then(() =>
            res.status(200).send({ message: 'Post deleted successfully.' }),
          )
          .catch((error) => res.status(500).send({ message: error.message }));
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};
