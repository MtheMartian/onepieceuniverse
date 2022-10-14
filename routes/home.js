const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.getIndex);
router.get('/getinfo', homeController.getInfo);
router.get('/home/searchcards', homeController.getSearchCardsPage);
router.get('/home/currentuser', homeController.getCurrentSignedInUser);
router.get('/home/search', homeController.searchCards);
router.get('/home/getinboxcomments', homeController.getInboxComments);

module.exports = router;