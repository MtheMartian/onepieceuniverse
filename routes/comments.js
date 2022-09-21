const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/home/postcomment', commentsController.postComment);
router.get('/comments', commentsController.getComments);

module.exports = router;