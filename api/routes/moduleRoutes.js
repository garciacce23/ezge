const express = require('express');
const ModuleController = require('../controllers/moduleController');
const router = express.Router();

const axios = require('axios'); // For utilizing student and course api routes
const config = require('../src/config');

router.get('/:screen', ModuleController.getAreaScreen);
router.get('/:screen/:area/', ModuleController.getCourseSelectionScreen);
router.post('/:screen/:area/', ModuleController.getCourseSelectionScreenFiltered);

module.exports = router;