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
    return res
      .status(400)
      .send({ message: 'Please provide all required fields.' });
  }

  // check for valid email address
  if (!verifyIsEmail(req.body.email)) {
    return res
      .status(400)
      .send({ message: 'Please provide a valid email address.' });
  }

  // database query
  await Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10), // hash password
  }).catch((error) => res.status(500).send({ message: error.message }));

  res.status(200).send({ message: 'User registered successfully.' });
};

/**
 * Log in an existing user and store JWT in a cookie.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = (req, res) => {
  // check for empty and or missing fields
  if (
    Object.keys(req.body).length < NUM_LOGIN_FIELDS ||
    !req.body.email ||
    !req.body.password
  ) {
    return res
      .status(400)
      .send({ message: 'Please provide all required fields.' });
  }

  // check for valid email address
  if (!verifyIsEmail(req.body.email)) {
    return res
      .status(400)
      .send({ message: 'Please provide a valid email address.' });
  }

  // database query
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      // check if user exists
      if (!user) {
        return res.status(404).send({ message: 'User does not exist.' });
      }

      // check password hash
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password.' });
      }

      // create jwt
      const token = sign({ id: user.id }, process.env.JWT_SECRET);

      // create cookie
      res.cookie('access-token', token, {
        maxAge: 86400, // 24 hours
        httpOnly: true,
      });

      res
        .status(200)
        .send({ id: user.id, name: `${user.first_name} ${user.last_name}` });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};
