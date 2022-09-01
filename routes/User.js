const express = require('express');
const router =  express.Router();
const usersController = require('../controllers/users');
const User = require('../models/User');

router.get('/page/signup', usersController.getSignUp);

module.exports = router;