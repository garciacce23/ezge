const express = require('express');
const ModuleController = require('../controllers/moduleController');
const router = express.Router();

const axios = require('axios'); // For utilizing student and course api routes
const config = require('../src/config');

router.get('/:screen', ModuleController.getModuleScreen);

module.exports = router;