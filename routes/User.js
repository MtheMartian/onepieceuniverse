const express = require('express');
const router =  express.Router();
const usersController = require('../controllers/users');

router.get('/page/signup', usersController.getSignUp);
router.post('/signup/newuser', usersController.postSignUp);
router.get('/page/signin', usersController.getSignIn);
router.post('/signin', usersController.postSignIn);
router.get('/signout', usersController.signOut);

module.exports = router;