const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/**
 * Check for a token and validate it.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
  const accessToken = req.headers['access-token'];

  // check if token exists
  if (!accessToken) {
    res.status(401).send({ message: 'User not authorized.' });
  } else {
    try {
      // validate token
      const validToken = verify(accessToken, process.env.JWT_SECRET);

      if (validToken) {
        next();
      } else {
        res.status(401).send({ message: 'User not authorized.' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};
