const replyController = require('../controllers/reply');
const express = require('express');
const router = express.Router();

router.put('/home/reply/:id', replyController.postReply);
router.put('/home/likereply/:id', replyController.likeReply);

module.exports = router;