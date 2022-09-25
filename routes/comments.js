const express = require('express');
const { reply } = require('../controllers/comments');
const router = express.Router();
const commentsController = require('../controllers/comments');
const {ensureAuthenticated} = require('../config/auth');

router.post('/home/postcomment', ensureAuthenticated, commentsController.postComment);
router.get('/comments', commentsController.getComments);
router.put('/home/likecomment/:id', ensureAuthenticated, commentsController.likeComment);

module.exports = router;