const app = require('./app');
const config = require('./config');
const mongoose = require('mongoose');

// -- Connect to MongoDB and start server -- //
const PORT = config.PORT; // Get port from config file
const MONGO_URI = config.MONGO_URI; // Get MongoDB URI from config file

console.log(`MONGO_URI: ${MONGO_URI}`);
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { // Connect to database
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });


// -- Populate Catalogue and Roster -- //
const CourseModel = require('./models/courseModel');
const StudentModel = require('./models/studentModel');
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

// -- Populate XModule Screens -- //
const ScreenModel = require('./models/screenModel');
const screens = require('./models/screens.json');
ScreenModel.insertMany(screens)
    .then (() => {
        console.log("Populated XModule Screens");
    })
    .catch(err => {
        console.error('Error populating XModule Screens:', err.message);
    });