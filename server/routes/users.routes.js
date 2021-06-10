const express = require('express');

// router
const router = express.Router();

// controller
const controller = require('../controllers/users.controller');

// middleware
const validateToken = require('../middleware/validateToken');

// routes ----------------------------------------------------------------

// get a user
router.get('/:userId', [validateToken], controller.getUser);

module.exports = router;
