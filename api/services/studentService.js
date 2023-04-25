const StudentModel = require('../models/studentModel');

class StudentService {
    async wishlistAdd(studentID, POS_ID) {
        const student = await StudentModel.findOne({ studentID }).exec();
        if (!student) {
            return ('Student not found');
        }

        // Check if POS_ID is not already in the wishlist
        if (!student.courses.wishList.some(course => course.POS_ID === Number(POS_ID))) {
            // Add POS_ID to the wishlist
            student.courses.wishList.push({ POS_ID: Number(POS_ID) });
        } else {
            console.log(`POS_ID ${POS_ID} is already in the wishlist for student ${studentID}`);
        }

        await student.save().then(() => {
            StudentModel.updateUndergradRequirements();
        });

        console.log(`Student ${studentID} wish list updated`);
    }

    async wishlistRemove(studentID, POS_ID) {
        const student = await StudentModel.findOne({ studentID }).exec();
        if (!student) {
            return ('Student not found');
        }

        student.courses.wishList = student.courses.wishList.filter(course => course.POS_ID !== Number(POS_ID));
        await student.save().then(()=> {
            StudentModel.updateUndergradRequirements();
        });

        console.log(`Student ${studentID} wish list updated`);

        return(student);
    }
}


module.exports = new StudentService();