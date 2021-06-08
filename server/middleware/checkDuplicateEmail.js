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
      res.status(400).send({ message: 'Email is already in use.' });
      return;
    }
    // continue if email does not exist
    next();
  });
};
