const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

// helper functions
const verifyIsEmail = require('../helpers/verifyIsEmail');

// model
const { Users } = require('../models');

// constants
const NUM_REGISTER_FIELDS = 4;
const NUM_LOGIN_FIELDS = 2;

/**
 * Check if current user is authenticated.
 *
 * @param {*} req
 * @param {*} res
 */
exports.auth = async (req, res) => {
  res.status(200).send({ auth: true });
};

/**
 * Register a new user.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.register = async (req, res) => {
  // check for empty and or missing fields
  if (
    Object.keys(req.body).length < NUM_REGISTER_FIELDS ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({ message: 'Please provide all required fields.' });
  } else {
    // check for valid email address
    if (!verifyIsEmail(req.body.email)) {
      res
        .status(400)
        .send({ message: 'Please provide a valid email address.' });
    } else {
      // database query
      await Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10), // hash password
      }).catch((error) => res.status(500).send({ message: error.message }));

      res.status(200).send({ message: 'User registered successfully.' });
    }
  }
};

/**
 * Log in an existing user and store JWT in a cookie.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = async (req, res) => {
  // check for empty and or missing fields
  if (
    Object.keys(req.body).length < NUM_LOGIN_FIELDS ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({ message: 'Please provide all required fields.' });
  } else {
    // check for valid email address
    if (!verifyIsEmail(req.body.email)) {
      res
        .status(400)
        .send({ message: 'Please provide a valid email address.' });
    } else {
      // database query
      await Users.findOne({
        where: { email: req.body.email },
      })
        .then((user) => {
          // check if user exists
          if (!user) {
            res.status(404).send({ message: 'User not found.' });
          } else {
            // check password hash
            const passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password,
            );

            if (!passwordIsValid) {
              res.status(401).send({ message: 'Invalid password.' });
            } else {
              // create jwt
              const token = sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 hours
              });

              res.status(200).send({
                auth: true,
                token: token,
              });
            }
          }
        })
        .catch((error) => res.status(500).send({ message: error.message }));
    }
  }
};
