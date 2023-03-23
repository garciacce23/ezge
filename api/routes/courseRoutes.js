const express = require('express');
const router = express.Router();
const CourseModel = require('../models/courseModel');


/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: Catalogue related routes
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         CRSE:
 *           type: string
 *           description: Course code
 *         CATALOG_NBR:
 *           type: string
 *           description: Course catalog number
 *         CRSE_CAREER:
 *           type: string
 *           description: Course career
 *         CRSE_DESCR:
 *           type: string
 *           description: Course description
 *         CRSE_ID:
 *           type: number
 *           description: Course ID
 *         CRSE_TITLE:
 *           type: string
 *           description: Course title
 *         CRSE_TYP_OFFR:
 *           type: string
 *           description: Course type offering
 *         CRSE_UPDATE:
 *           type: string
 *           format: date
 *           description: Course update date
 *         DEPT_ID:
 *           type: number
 *           description: Department ID
 *         GE_ATTRIBUTE:
 *           type: string
 *           description: General education attribute
 *         SUBJECT_ID:
 *           type: string
 *           description: Subject ID
 *         UNITS_RANGE:
 *           type: string
 *           description: Units range
 *         UNIT_REPEAT_LIMIT:
 *           type: string
 *           description: Unit repeat limit
 *         POS_ID:
 *           type: number
 *           description: Course's Mongo Course ID
 */



/**
 * @swagger
 * /courses/:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Created course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
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


/**
 * @swagger
 * /courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find().exec();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get a course by its POS_ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course POS_ID
 *     responses:
 *       200:
 *         description: Course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await CourseModel.findOne({ POS_ID: id }).exec();
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /courses/GE/{ge_attribute}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get courses by their GE attribute
 *     parameters:
 *       - in: path
 *         name: ge_attribute
 *         schema:
 *           type: string
 *         required: true
 *         description: GE attribute
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No courses found
 *       500:
 *         description: Internal server error
 */
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


/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course by its POS_ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course POS_ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Updated course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCourse = await CourseModel.findOneAndUpdate(
            { POS_ID: id },
            req.body,
            { new: true }
        ).exec();
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete a course by its POS_ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Deleted course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
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