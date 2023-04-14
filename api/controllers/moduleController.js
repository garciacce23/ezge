const ModuleService = require('../services/moduleService');

class ModuleController {
    async getModuleScreen(req, res) {
        const screen = req.params.screen;
        try {
            const moduleScreen = await ModuleService.getModule(screen);
            res.json(moduleScreen);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }
}

module.exports = new ModuleController();