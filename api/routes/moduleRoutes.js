const express = require('express');
const ModuleController = require('../controllers/moduleController');
const router = express.Router();

const axios = require('axios'); // For utilizing student and course api routes
const config = require('../src/config');

router.get('/:screen', ModuleController.getAreaScreen);
router.get('/:screen/:area/:studentID?', ModuleController.getCourseSelectionScreen);
router.post('/:screen/:area/:studentID', ModuleController.getCourseSelectionScreen);

module.exports = router;