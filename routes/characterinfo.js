const characterInfoController = require('../controllers/characterinfo');
const express = require('express');
const router = express.Router();

  router.get('/', characterInfoController.moreInfo);

  module.exports = router;

