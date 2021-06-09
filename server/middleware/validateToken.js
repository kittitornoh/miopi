const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  // check if cookie exists
  if (!accessToken) {
    return res.status(401).send({ message: 'User not authorized.' });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);

    if (validToken) {
      req.authenticated = true;
      return next();
    } else {
      req.authenticated = false;
      return res.status(401).send({ message: 'User not authorized.' });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
