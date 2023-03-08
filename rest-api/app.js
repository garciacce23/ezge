const express = require('express');
const bodyParser = require('body-parser');
const CourseRoutes = require('./routes/courseRoutes');
const StudentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/courses', CourseRoutes);
app.use('/api/students', StudentRoutes);

module.exports = app;
