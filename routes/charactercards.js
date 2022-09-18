const express = require('express');
const router = express.Router();
const characterCardsController = require('../controllers/charactercard');
const {ensureAuthenticated} = require('../config/auth');
const upload = require('../middleware/multer');

router.post('/addCharacter', ensureAuthenticated, characterCardsController.createCard);
router.put('/updateCard', ensureAuthenticated, characterCardsController.editCard);
router.delete('/deletecard', ensureAuthenticated, characterCardsController.removeCard);
router.put('/charactercard/:id/upload/image', upload.single("file"), characterCardsController.uploadCardImg);

module.exports = router;