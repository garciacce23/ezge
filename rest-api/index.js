require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); //middleware for parsing JSON
const CourseModel = require('./models/courseModel'); // Import CourseModel
const StudentModel = require('./models/studentModel'); // Import StudentModel

const app = express();
const PORT = process.env.API_PORT;

app.use(bodyParser.json()); // Middleware for parsing JSON; allows us to access request body


// -- Connect to MongoDB and start server -- //
const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from .env file
console.log(`MONGO_URI: ${mongoURI}`);
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { // Connect to database
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Populate Database from Files //
// Populate Database from Files //
// Populate Catalogue and Roster
const catalogue = require('./models/course_catalogue.json');
const roster = require('./models/student_roster.json');

Promise.all([
    CourseModel.insertMany(catalogue),
    StudentModel.insertMany(roster)
])
    .then(() => {
        console.log("Populated Catalogue and Roster");
        return StudentModel.updateUndergradRequirements();
    })
    .then(() => {
        console.log("Updated Undergrad Requirements");
    })
    .catch(err => {
        console.error('Error populating database:', err.message);
    });

// Set up routes //

// Create
app.post('/api/create', async (req, res) => {
    const newCourse = new CourseModel({

        CRSE: req.body.CRSE ,
        CATALOG_NBR: req.body.CATALOG_NBR ,
        CRSE_CAREER: req.body.CRSE_CAREER ,
        CRSE_DESCR: req.body.CRSE_DESCR ,
        CRSE_ID: req.body.CRSE_ID ,
        CRSE_TITLE: req.body.CRSE_TITLE ,
        CRSE_TYP_OFFR: req.body.CRSE_TYP_OFFR ,
        CRSE_UPDATE: req.body.CRSE_UPDATE ,
        DEPT_ID: req.body.DEPT_ID ,
        GE_ATTRIBUTE: req.body.GE_ATTRIBUTE ,
        SUBJECT_ID: req.body.SUBJECT_ID ,
        UNITS_RANGE: req.body.UNITS_RANGE ,
        UNIT_REPEAT_LIMIT: req.body.UNIT_REPEAT_LIMIT,
        POS_ID: req.body.POS_ID

    });

    try {
        await newCourse.save();
        res.json(newCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

});

// Read
app.get('/api/get', async (req, res) => {
    const geAttribute = req.query.GE_ATTRIBUTE;

    try {
        const courses = await CourseModel.find({ GE_ATTRIBUTE: geAttribute }).exec();
        console.log(req);
        console.log(geAttribute);
        console.log(courses);
        if (courses.length === 0) {
            return res.status(404).json({ error: 'No courses found' });
        }
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
app.post('/api/update', async (req, res) => {
    const course = req.body;

    try {
        const updatedCourse = await CourseModel.findOneAndUpdate
        ({ POS_ID: course.POS_ID }, course, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete
app.delete('/api/delete', async (req, res) => {
    const positionID = req.body.POS_ID;

    try {
        const deletedCourse = await CourseModel.findOneAndDelete({ POS_ID: positionID });
        res.json(deletedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});