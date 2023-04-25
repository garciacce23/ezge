const ModuleService = require('../services/moduleService');
const generateCourseSelectionScreen = require('../helpers/generateCourseSelectionScreen');

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

        try {
            const moduleScreen = await generateCourseSelectionScreen(area);
            res.json(moduleScreen);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }
}

module.exports = new ModuleController();