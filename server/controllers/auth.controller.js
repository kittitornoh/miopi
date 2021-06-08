const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// enable environment variables
const dotenv = require('dotenv').config();

// helper functions
const verifyIsEmail = require('../helpers/verifyIsEmail');

// model
const { Users } = require('../models');

// register new user
exports.register = async (req, res) => {
  // check for empty fields
  if (
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

  // hash password
  await bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // database query
      Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
      }).catch((error) => res.status(500).send({ message: error.message }));

      res.status(200).send({ message: 'User registered successfully.' });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

// log existing user in
exports.login = (req, res) => {};
