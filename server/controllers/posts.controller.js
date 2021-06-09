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
 * Get all posts of a single user that is logged in.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getMyPosts = async (req, res) => {};

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
    return res
      .status(400)
      .send({ message: 'Please provide all required fields.' });
  }

  // database query for user
  await Users.findOne({
    where: {
      id: req.body.userId,
    },
  })
    .then((user) => {
      // check if user exists
      if (!user) {
        return res.status(404).send({ message: 'User does not exist.' });
      }

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
    })
    .catch((error) => res.status(500).send({ message: error.message }));

  // database query
};

/**
 * Delete a logged in user's post.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteMyPost = async (req, res) => {
  //
  await Posts.destroy({
    where: {
      id: req.params.postId,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Post deleted.' });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};
