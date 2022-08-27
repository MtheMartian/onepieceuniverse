const characterInfoController = require('../controllers/characterinfo');
const express = require('express');
const router = express.Router();

  router.put('/updateseemore', characterInfoController.moreInfoUpdate);

  module.exports = router;

