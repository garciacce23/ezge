const { screens, components } = require('../templates');
const axios = require("axios");
const config = require("../src/config");
const templates = require("../templates");



// Generate Course Selection Screen
async function generateCourseSelectionScreen(area) {
    // Get student id from JWT...
    const studentID = 123456789;

    let CourseSelectionJSON = templates.screens.CourseSelection;


    const { data: areaCourses }
        = await axios.get(`http://localhost:${config.PORT}/api/courses/GE_ATTRIBUTE/${area}`);

    let courses = [];

    for (const index in areaCourses) {
        const course = areaCourses[index];
        console.log(`COURSE: ${course}`);
        let item =
            {
                "label": "",
                "title": `${course.CRSE_TITLE}`,
                "content": [
                    {
                        "id": "filters_con",
                        "content": [
                            {
                                "html": `<p>${course.CRSE_DESCR}<br><br>Units: ${course.UNITS_RANGE}<br>Course Typically Offered: ${course.CRSE_TYP_OFFR}<br> GE Area: ${area}<br><br> </p>`,
                                "elementType": "html"
                            },
                            {
                                "link": {
                                    "relativePath": `../../students/wishlist/remove/${studentID}/${course.POS_ID}/${area}`
                                },
                                "title": "Select",
                                "actionStyle": "constructive",
                                "elementType": "linkButton",
                                "borderRadius": "loose"
                            }
                        ],
                        "padding": "medium",
                        "borderStyle": "none",
                        "elementType": "container",
                        "borderRadius": "loose",
                        "wrapperStyle": "subfocal"
                    }
                ],
                "description": "",
                "elementType": "collapsible"
            }

        courses.push(item);

    }

    let jump = 5;
    for(const index in courses){
        console.log(`course: `, courses[index]);
        CourseSelectionJSON.content[jump] = courses[index];
        jump++;
    }

    return(CourseSelectionJSON);

}

module.exports = generateCourseSelectionScreen;