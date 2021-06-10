// models
const { Users } = require('../models');

/**
 * Get a user's first name, last name, and email.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getUser = async (req, res) => {
  // database query
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
        res.status(200).send({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};
