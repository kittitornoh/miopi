const express = require('express');

// router
const router = express.Router();

// model
const { User } = require('../models');

// controller
const controller = require('../controllers/auth.controller');

// middleware
const checkDuplicateEmail = require('../middleware/checkDuplicateEmail');

// routes ----------------------------------------------------------------

// register new user
router.post('/register', [checkDuplicateEmail], controller.register);

// log existing user in
router.post('/login', controller.login);

module.exports = router;
