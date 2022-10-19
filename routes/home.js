const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const {ensureAuthenticated} = require('../config/auth');

router.get('/', homeController.getIndex);
router.get('/getinfo', homeController.getInfo);
router.get('/home/searchcards', homeController.getSearchCardsPage);
router.get('/home/currentuser', homeController.getCurrentSignedInUser);
router.get('/home/search', homeController.searchCards);
router.get('/home/getinboxcomments', homeController.getInboxComments);
router.get('/home/help', ensureAuthenticated, homeController.getHelp);
module.exports = router;