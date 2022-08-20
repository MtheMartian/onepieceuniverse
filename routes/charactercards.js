const express = require('express');
const router = express.Router();
const characterCardsController = require('../controllers/charactercard');

router.post('/addCharacter', characterCardsController.createCard);
router.put('/updateCard', characterCardsController.editCard);
router.delete('/deletecard', characterCardsController.removeCard);

module.exports = router;