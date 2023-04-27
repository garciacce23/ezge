const ModuleService = require('../services/moduleService');
const generateCourseSelectionScreen = require('../helpers/generateCourseSelectionScreen');
const getCourseSelectionScreen = require('../helpers/getCourseSelectionScreen');

class ModuleController {
    async getAreaScreen(req, res) {
        const screen = req.params.screen;
        try {
            const moduleScreen = await ModuleService.getModule(screen);
            res.json(moduleScreen);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    async getCourseSelectionScreen(req, res) {
        const area = req.params.area;

        // Check if studentID is passed in
        const studentID = req.params.studentID;
        if (studentID != null) {
            try {
                const moduleScreen = getCourseSelectionScreen(area, studentID, req.body);
                res.json(moduleScreen);
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }

        } else {
            try {
                const moduleScreen = await generateCourseSelectionScreen(area);
                res.json(moduleScreen);
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        }


    }
}

module.exports = new ModuleController();