const express = require('express');
const { reply } = require('../controllers/comments');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/home/postcomment', commentsController.postComment);
router.get('/comments', commentsController.getComments);
router.put('/home/likecomment/:id', commentsController.likeComment);

module.exports = router;