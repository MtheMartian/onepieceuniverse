const characterInfoController = require('../controllers/characterinfo');
const express = require('express');
const router = express.Router();

  router.get('/updateseemore', characterInfoController.moreInfoUpdate);

  module.exports = router;

