const express = require('express');
const { reply } = require('../controllers/comments');
const router = express.Router();
const commentsController = require('../controllers/comments');
const {ensureAuthenticated} = require('../config/auth');

router.post('/home/postcomment', ensureAuthenticated, commentsController.postComment);
router.get('/comments/:cardID', commentsController.getComments);
router.put('/home/likecomment/:id', ensureAuthenticated, commentsController.likeComment);
router.put('/home/inbox/markseen/:id', ensureAuthenticated, commentsController.markAsSeen);

module.exports = router;