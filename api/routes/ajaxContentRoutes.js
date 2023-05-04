// DATED

const express = require('express');
const router = express.Router();
const ajaxContentModel = require('../models/ajaxContentModel');
const axios = require('axios'); // For utilizing student and course api routes
const config = require('../src/config');
const getWishlistedCourses = require('../helpers/getWishlistedCourses');


module.exports = router;