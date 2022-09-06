const express = require('express');
const router = express.Router();
const characterCardsController = require('../controllers/charactercard');
const {ensureAuthenticated} = require('../config/auth');

router.post('/addCharacter', ensureAuthenticated, characterCardsController.createCard);
router.put('/updateCard', ensureAuthenticated, characterCardsController.editCard);
router.delete('/deletecard', ensureAuthenticated, characterCardsController.removeCard);

module.exports = router;