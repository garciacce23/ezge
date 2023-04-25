const studentService = require('../services/studentService');
const Templates = require('../templates/')

class StudentController {

    async wishlistAdd(req, res) {
        const studentID = req.params.studentID;
        const POS_ID = req.params.POS_ID;
        const area = req.params.area;
        try {
            const student = await studentService.wishlistAdd(studentID, POS_ID);
            let redirectJSON = Templates.screens.WishlistAdd;
            redirectJSON.metadata.redirectLink.external =
                `https://www.ezge152.link/api/modules/CourseSelection/${area}`
            console.log(`redirectJSON: ${redirectJSON}`);
            res.json(redirectJSON);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    async wishlistRemove(req, res) {
        const studentID = req.params.studentID;
        const POS_ID = req.params.POS_ID;
        try {
            const student = await studentService.wishlistRemove(studentID, POS_ID);
            res.json(Templates.screens.WishlistRemove);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }


}

module.exports = new StudentController();