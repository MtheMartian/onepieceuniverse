const replyController = require('../controllers/reply');
const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.put('/home/reply/:id', ensureAuthenticated,replyController.postReply);
router.put('/home/likereply/:id', ensureAuthenticated,replyController.likeReply);
router.get('/replies', replyController.getReplies);

module.exports = router;