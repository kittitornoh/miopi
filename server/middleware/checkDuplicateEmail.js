// model
const { Users } = require('../models');

/**
 * Check if an email already exists in the database.
 *
 * @param   req
 * @param   res
 * @param   next
 */
module.exports = (req, res, next) => {
  // database query
  Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({ message: 'Email is already in use.' });
    }
    // continue if email does not exist
    return next();
  });
};
