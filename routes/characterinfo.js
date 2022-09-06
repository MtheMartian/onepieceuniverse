const characterInfoController = require('../controllers/characterinfo');
const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

  router.put('/updateseemore', ensureAuthenticated, characterInfoController.moreInfoUpdate);

  module.exports = router;

