const express = require('express');
const bodyParser = require('body-parser');

// Import Routes
const CourseRoutes = require('./routes/courseRoutes');
const StudentRoutes = require('./routes/studentRoutes');
const screenRoutes = require("./routes/screenRoutes");

const app = express();

app.use(bodyParser.json());

// Set up routes
app.use('/api/courses', CourseRoutes);
app.use('/api/students', StudentRoutes);
app.use('/api/screens', screenRoutes);

// Export app
module.exports = app;