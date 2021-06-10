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
    return res.status(401).send({ message: 'User not authorized.' });
  }

  try {
    // validate token
    const validToken = verify(accessToken, process.env.JWT_SECRET);

    if (validToken) {
      req.authenticated = true;
      return next();
    } else {
      req.authenticated = false;
      return res.status(401).send({ message: 'User not authorized.' });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
