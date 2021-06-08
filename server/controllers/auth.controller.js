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
  // #TODO: check for missing fields

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

  // database query
  await Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10), // hash password
  }).catch((error) => res.status(500).send({ message: error.message }));

  res.status(200).send({ message: 'User registered successfully.' });
};

// log existing user in
exports.login = (req, res) => {
  // #TODO: check for missing fields

  // check for empty fields
  if (!req.body.email || !req.body.password) {
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
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      // create cookie
      res.cookie('access-token', token, {
        maxAge: 86400, // 24 hours
      });

      res.status(200).send({ message: 'Log in successful.' });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};