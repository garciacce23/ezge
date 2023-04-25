const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Swagger Requirements
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinition');


const app = express();
app.use(bodyParser.json());

// Log API requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.path}`);
    next();
});


// Set up routes //
const CourseRoutes = require('../routes/courseRoutes');
app.use('/api/courses', CourseRoutes);

const StudentRoutes = require('../routes/studentRoutes');
app.use('/api/students', StudentRoutes);

const screenRoutes = require("../routes/screenRoutes");
app.use('/api/screens', screenRoutes);

const moduleRoutes = require("../routes/moduleRoutes");
app.use('/api/modules', moduleRoutes);

const ajaxContentRoutes = require("../routes/ajaxContentRoutes");
app.use('/api/ajaxContents', ajaxContentRoutes);


// Splash Page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.get('/test', (req, res) => {
    res.send('Rizzy GE Test Page');
});


// Generate API documentation based on routes and Swagger definition
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.js')],
};
const swaggerSpec = swaggerJsdoc(options);
// Serve Swagger documentation at /api-docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Export app
module.exports = app;