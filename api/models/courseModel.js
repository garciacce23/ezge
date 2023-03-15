const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    CRSE: {type: String, required: true},
    CATALOG_NBR: {type: String, required: true},
    CRSE_CAREER: {type: String, required: true},
    CRSE_DESCR: {type: String, required: true},
    CRSE_ID: {type: Number, required: true},
    CRSE_TITLE: {type: String, required: true},
    CRSE_TYP_OFFR: {type: String, required: true},
    CRSE_UPDATE: {type: Date, required: true},
    DEPT_ID: {type: Number, required: true},
    GE_ATTRIBUTE: {type: String, required: true},
    SUBJECT_ID: {type: String, required: true},
    UNITS_RANGE: {type: String, required: true},
    UNIT_REPEAT_LIMIT: {type: String, required: true},
    POS_ID: {type: Number, required: true}

}, { collection: 'catalogue' });

// courseSchema.index({ POS_ID: 1 }, { unique: true }); // Made redundant by init-mongo.js

const CourseModel = mongoose.model('CourseModel', courseSchema);

module.exports = CourseModel;

/*
"COMM-3": {
        "CATALOG_NBR": "3",
        "CRSE_CAREER": "UGRD",
        "CRSE_DESCR": "Theories of human communication and their function in contemporary public settings; experiences designed to enhance fundamental communication skills -- research, organization, reasoning, listening, and problem solving -- through a series of oral presentations.  G.E. Foundation A1.",
        "CRSE_ID": "002771",
        "CRSE_TITLE": "Fundamentals of Public Communication",
        "CRSE_TYP_OFFR": "Fall, Spring",
        "CRSE_UPDATE": "2021-08-02",
        "DEPT_ID": "686",
        "GE_ATTRIBUTE": "A1",
        "SUBJECT_ID": "COMM",
        "UNITS_RANGE": "3",
        "UNIT_REPEAT_LIMIT": "3"
    },
 */