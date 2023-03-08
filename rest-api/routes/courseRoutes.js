const express = require('express');
const router = express.Router();
const CourseModel = require('../models/courseModel');

// Create
router.post('/', async (req, res) => {
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
router.get('/GE/:ge_attribute', async (req, res) => {
    const { ge_attribute } = req.params;
    const geAttribute = ge_attribute;

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
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const course = id;

    try {
        const updatedCourse = await CourseModel.findOneAndUpdate
        ({ POS_ID: course.POS_ID }, course, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await CourseModel.findOneAndDelete({ POS_ID: id });
        res.json(deletedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;