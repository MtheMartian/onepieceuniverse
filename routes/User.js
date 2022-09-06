const express = require('express');
const { getUsers } = require('../controllers/users');
const router =  express.Router();
const usersController = require('../controllers/users');

router.get('/page/signup', usersController.getSignUp);
router.post('/signup/newuser', usersController.postSignUp);
router.get('/page/signin', usersController.getSignIn);
router.post('/signin', usersController.postSignIn);
router.get('/signout', usersController.signOut);
router.get('/users', getUsers);

module.exports = router;