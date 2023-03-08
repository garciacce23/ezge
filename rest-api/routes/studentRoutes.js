const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');

// Create
router.post('/', async (req, res, next) => {
    const newStudent = new StudentModel({
        // Student model fields
    });

    try {
        await newStudent.save();
        res.json(newStudent);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Read
router.get('/', async (req, res, next) => {
    try {
        const students = await StudentModel.find().exec();
        res.json(students);
    } catch (error) {
        next(error);
    }
});

// Update
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const student = id;

    try {
        const updatedStudent = await StudentModel.findOneAndUpdate(
            {POS_ID: student.POS_ID },
            student, { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }

        res.json(updatedStudent);
    } catch (error) {
        next(error);
    }
});

// Delete
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }

        res.json(deletedStudent);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
