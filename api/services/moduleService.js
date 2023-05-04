const helpers = require('../helpers');

class ModuleService {
    async getModule(screen) {
        // Generate screen helper map by filtering the helper functions that follow the "generateXScreen" pattern
        const screenHelperMap = Object.entries(helpers).reduce((map, [name, helperFunction]) => {
            if (name.startsWith('generate') && name.endsWith('Screen')) {
                const screenName = name.replace(/^generate/, '').replace(/Screen$/, '');
                map[screenName] = helperFunction;
            }
            return map;
        }, {});

        console.log('screenHelperMap:', JSON.stringify(screenHelperMap, null, 2));


        // Find the helper function for the given screen
        const helperFunction = screenHelperMap[screen];

        // Throw an error if the screen is unsupported
        if (!helperFunction) {
            throw new Error(`Unsupported screen: ${screen}`);
        }

        try {
            // Call the helper function to get the module JSON
            const result = await helperFunction();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ModuleService();
