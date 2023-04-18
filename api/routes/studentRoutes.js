const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Roster related routes
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       description: Student Record
 *       properties:
 *         studentID:
 *           type: string
 *           description: Unique student identifier
 *         name:
 *           type: object
 *           properties:
 *             first:
 *               type: string
 *               description: The student's first name
 *             last:
 *               type: string
 *               description: The student's last name
 *         courses:
 *           type: object
 *           description: Student's courses
 *           properties:
 *             completed:
 *               type: array
 *               description: Student's completed courses
 *               items:
 *                 type: object
 *                 properties:
 *                   POS_ID:
 *                     type: number
 *                     description: Mongo Course ID
 *             inProgress:
 *               type: array
 *               description: Student's in-progress courses
 *               items:
 *                 type: object
 *                 properties:
 *                   POS_ID:
 *                     type: number
 *                     description: Mongo Course ID
 *             wishList:
 *               type: array
 *               description: Student's wish-listed courses
 *               items:
 *                 type: object
 *                 properties:
 *                   POS_ID:
 *                     type: number
 *                     description: Mongo Course ID
 *         undergradRequirements:
 *           type: object
 *           description: Student's undergraduate requirements
 *           properties:
 *             completed:
 *               type: array
 *               description: Student's completed undergraduate requirements
 *               items:
 *                 type: object
 *                 properties:
 *                   GE_ATTRIBUTE:
 *                     type: string
 *                     description: GE attribute
 *             inProgress:
 *               type: array
 *               description: Student's in-progress undergraduate requirements
 *               items:
 *                 type: object
 *                 properties:
 *                   GE_ATTRIBUTE:
 *                     type: string
 *                     description: GE attribute
 *             onWishList:
 *               type: array
 *               description: Student's wish-listed undergraduate requirements
 *               items:
 *                 type: object
 *                 properties:
 *                   GE_ATTRIBUTE:
 *                     type: string
 *                     description: GE attribute
 *             incomplete:
 *               type: array
 *               description: Student's incomplete undergraduate requirements
 *               items:
 *                 type: object
 *                 properties:
 *                   GE_ATTRIBUTE:
 *                     type: string
 *                     description: GE attribute
 *         major:
 *           type: string
 *           description: The student's major
 *         standing:
 *           type: string
 *           description: The student's academic standing
 *           enum:
 *             - Freshman
 *             - Sophomore
 *             - Junior
 *             - Senior
 */



/**
 * @swagger
 * /students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create a new student
 *     description: Create a new student with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Created student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res, next) => {
    const newStudent = new StudentModel({
        studentID: req.body.studentID,
        name: {
            first: req.body.name.first,
            last: req.body.name.last
        },
        courses: {
            completed: req.body.courses.completed,
            inProgress: req.body.courses.inProgress,
            wishList: req.body.courses.wishList
        },
        undergradRequirements: req.body.undergradRequirements
            ? {
                completed: req.body.undergradRequirements.completed,
                inProgress: req.body.undergradRequirements.inProgress,
                onWishList: req.body.undergradRequirements.onWishList,
                incomplete: req.body.undergradRequirements.incomplete,
            }
            : undefined,
        major: req.body.major,
        standing: req.body.standing,
    });

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a list of all students
 *     description: Retrieve a list of all students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
    try {
        const students = await StudentModel.find().exec();
        res.json(students);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /students/{key}/{value}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a student by a specified key and value
 *     description: Retrieve a student by a specified key and value
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key to search by
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Value of the specified key
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/:key/:value', async (req, res) => {
    const { key, value } = req.params;
    const query = {};
    query[key] = value;

    try {
        const student = await StudentModel.find(query).exec();
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




/**
 * @swagger
 * /students/{id}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Update a student by their student ID
 *     description: Update a student's information by their student ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Updated student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { studentID: id },
            req.body,
            { new: true }
        ).exec();
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Delete a student by their student ID
 *     description: Delete a student by their student ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Deleted student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await StudentModel.findOneAndDelete({ studentID: id }
        ).exec();
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(deletedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
