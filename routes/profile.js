const profileController = require('../controllers/profile');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {ensureAuthenticated} = require('../config/auth');

router.get('/myprofile', ensureAuthenticated, profileController.getMyProfilePage);
router.put('/myprofile/username', ensureAuthenticated, profileController.changeUserName);
router.put('/myprofile/email', ensureAuthenticated, profileController.changeEmail);
router.put('/myprofile/password', ensureAuthenticated, profileController.changePassword);
router.put('/myprofile/charactercard/:id/upload/image', upload.single("file"), profileController.uploadCardImgProfilePage)

module.exports = router;
