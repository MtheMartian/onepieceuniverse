const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.getWelcomePage);
router.get('/home', homeController.getIndex);
router.get('/getinfo', homeController.getInfo);
router.get('/home/searchcards', homeController.getSearchCardsPage);
router.get('/home/currentuser', homeController.getCurrentSignedInUser);

module.exports = router;