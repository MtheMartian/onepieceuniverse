const replyController = require('../controllers/reply');
const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.post('/home/reply/:id', ensureAuthenticated,replyController.postReply);
router.post('/home/inboxreply/:id', ensureAuthenticated, replyController.markAsSeenAndReply);
router.put('/home/likereply/:id', ensureAuthenticated,replyController.likeReply);
router.get('/replies/:id', replyController.getReplies);

module.exports = router;