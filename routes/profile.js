const profileController = require('../controllers/profile');
const express = require('express');
const router = express.Router();

router.get('/myprofile', profileController.getMyProfilePage);
router.put('/myprofile/username', profileController.changeUserName);
router.put('/myprofile/email', profileController.changeEmail);
router.put('/myprofile/password', profileController.changePassword);

module.exports = router;
