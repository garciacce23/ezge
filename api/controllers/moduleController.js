const ModuleService = require('../services/moduleService');
const generateCourseSelectionScreen = require('../helpers/generateCourseSelectionScreen');
const getCourseSelectionScreen = require('../helpers/getCourseSelectionScreenFiltered');
const getCourseSelectionScreenFiltered = require('../helpers/getCourseSelectionScreenFiltered');

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

    async getCourseSelectionScreenFiltered(req, res) {
        const area = req.params.area;

        try {
            // Print specific parts of the request object
            console.log('Request headers:', JSON.stringify(req.headers, null, 2));
            console.log('Request body:', JSON.stringify(req.body, null, 2));
            console.log('Request URL:', req.url);
            console.log('Request method:', req.method);

            const postedContent = req.body; // Get the posted content from the request body
            const moduleScreen = await getCourseSelectionScreenFiltered(area, postedContent);
            res.json(moduleScreen);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }
}



module.exports = new ModuleController();