const { screens, components } = require('../templates');
const axios = require("axios");
const config = require("../src/config");
const templates = require("../templates");


async function getCourseSelectionScreen(area, studentID, postedContent) {
    console.log(`HELPER getCourseSelectionScreen: area: ${area}, studentID: ${studentID}`);

    // Get Area Course Selection Screen JSON
    const areaCourseSelectionJSON=
        await axios.get(`http://localhost:${config.PORT}/api/modules/CourseSelection/${area}`);



    // Extract Courses JSON List from Content (everything after content[5])
    let coursesJSON = areaCourseSelectionJSON.data.content.slice(5);

    console.log(`HELPER getCourseSelectionScreen: postedContent: `, postedContent);

    return(postedContent);


}

module.exports = getCourseSelectionScreen;