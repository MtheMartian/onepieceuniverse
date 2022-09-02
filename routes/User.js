const express = require('express');
const router =  express.Router();
const usersController = require('../controllers/users');

router.get('/page/signup', usersController.getSignUp);
router.post('/signup/newuser', usersController.postSignUp);
router.get('/signin', usersController.getSignIn);
router.post('/signin', usersController.postSignIn);

module.exports = router;