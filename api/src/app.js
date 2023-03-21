const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import Routes
const CourseRoutes = require('../routes/courseRoutes');
const StudentRoutes = require('../routes/studentRoutes');
const screenRoutes = require("../routes/screenRoutes");

const app = express();

app.use(bodyParser.json());

// Set up routes
app.use('/api/courses', CourseRoutes);
app.use('/api/students', StudentRoutes);
app.use('/api/screens', screenRoutes);

// Serve the index.html file for the root path "/"
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.get('/test', (req, res) => {
    res.send('Rizzy GE Test Page');
});

// Export app
module.exports = app;