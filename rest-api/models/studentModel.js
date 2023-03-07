const mongoose = require('mongoose');
const CourseModel = require('./courseModel'); // Import CourseModel

const studentSchema = new mongoose.Schema({
    studentId: {type: String, required: true, unique: true},
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true},
    },
    courses: {
        completed: [{
            POS_ID: {type: Number}
        }],
        inProgress: [{
            POS_ID: {type: Number}
        }],
        wishList: [{
            POS_ID: {type: Number}
        }],
    },
    undergradRequirements: {
        completed: [{ GE_ATTRIBUTE: {type: String} }],
        inProgress: [{GE_ATTRIBUTE: {type: String} }],
        onWishList: [{ GE_ATTRIBUTE: {type: String} }],
        incomplete: [{ GE_ATTRIBUTE: {type: String} }],
    },
    major: {type: String},
    standing: {
        type: String,
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    },
}, { collection: 'roster' });


// Define a function that updates the undergradRequirements field of a student
studentSchema.statics.updateUndergradRequirements = async function() {
    console.log("updateUndergradRequirements was called...")
    const students = await this.find();

    for (const student of students) {
        const courseIds = student.courses.completed
            .concat(student.courses.inProgress)
            .concat(student.courses.wishList)
            .map(course => course.POS_ID);
        console.log(`CourseIds: ${courseIds}`)

        // Find the courses that the student has taken
        const courses = await CourseModel.find({POS_ID: {$in: courseIds}});

        console.log(`Number of courses: ${courses.keys(courses).length}`);

        // Get the GE_ATTRIBUTE values for the completed, in-progress courses, and wish listed courses
        const completedGEs = courses
            .filter(course => course.GE_ATTRIBUTE !== 'NA' && student.courses.completed.some(completed => course.GE_ATTRIBUTE !== 'NA' && completed.POS_ID === course.POS_ID))
            .map(course => course.GE_ATTRIBUTE);
        const inProgressGEs = courses
            .filter(course => course.GE_ATTRIBUTE !== 'NA' && student.courses.inProgress.some(inProgress => inProgress.POS_ID === course.POS_ID))
            .map(course => course.GE_ATTRIBUTE);
        const wishListGEs = courses
            .filter(course => course.GE_ATTRIBUTE !== 'NA' && student.courses.wishList.some(wishList => wishList.POS_ID === course.POS_ID))
            .map(course => course.GE_ATTRIBUTE);

        console.log(`completedGEs: ${completedGEs}`);
        console.log(`inProgressGEs: ${inProgressGEs}`);
        console.log(`wishListGEs: ${wishListGEs}`);

        // Create arrays of unique GE_ATTRIBUTE values for the completed, in-progress, and remaining requirements
        const uniqueCompletedGEs = [...new Set(completedGEs)];
        console.log(`uniqueCompletedGEs: ${uniqueCompletedGEs}`)

        const uniqueInProgressGEs = [...new Set(inProgressGEs)];
        console.log(`uniqueInProgressGEs: ${uniqueInProgressGEs}`)

        const uniqueWishListGEs = [...new Set(wishListGEs)];
        console.log(`uniqueWishListGEs: ${uniqueWishListGEs}`)

        // Get all the GE_ATTRIBUTE values in the catalogue
        const catalogueGEs = await CourseModel.distinct('GE_ATTRIBUTE');

        // Find the remaining GE_ATTRIBUTE values that do not appear in the student's requirements
        const uniqueRemainingGEs = catalogueGEs.filter(GE => !uniqueCompletedGEs.includes(GE)
            && !uniqueInProgressGEs.includes(GE)
            && !uniqueWishListGEs.includes(GE)
            && GE !== 'NA');
        console.log(`uniqueRemainingGEs: ${uniqueRemainingGEs}`);

        // Update the undergradRequirements field of the student document
        student.undergradRequirements.completed = uniqueCompletedGEs.map(GE => ({GE_ATTRIBUTE: GE}));
        student.undergradRequirements.inProgress = uniqueInProgressGEs.map(GE => ({GE_ATTRIBUTE: GE}));
        student.undergradRequirements.onWishList = uniqueWishListGEs.map(GE => ({GE_ATTRIBUTE: GE}));
        student.undergradRequirements.incomplete = uniqueRemainingGEs.map(GE => ({GE_ATTRIBUTE: GE}));

        // Save the updated student document
        await student.save();
    }
};

const StudentModel = mongoose.model('StudentModel', studentSchema);

module.exports = StudentModel;


`
    [{
  "studentId": "12345",
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "courses": {
    "completed": [
      {
        "POS_ID": 992
      },
      {
        "POS_ID": 1798
      }
    ],
    "inProgress": [
      {
        "POS_ID": 2164
      },
      {
        "POS_ID": 2456
      }
    ],
    "wishList": [
      {
        "POS_ID": 3032
      }
    ]
  },
  "major": "Computer Science",
  "standing": "Junior"
}]
`