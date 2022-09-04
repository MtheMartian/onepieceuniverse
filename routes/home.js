const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.getWelcomePage);
router.get('/home', homeController.getIndex);
router.get('/getinfo', homeController.getInfo);

module.exports = router;