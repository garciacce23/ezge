const { screens, components } = require('../templates');
const axios = require("axios");
const config = require("../src/config");
const templates = require("../templates");
const getUniqueSubjects = require("./getUniqueSubjects");


// Generate Course Selection Screen
async function generateCourseSelectionScreen(area) {
    // Get student id from JWT...
    const studentID = 123456789;

    let CourseSelectionJSON = JSON.parse(JSON.stringify(templates.screens.CourseSelection));

    CourseSelectionJSON.content[2].heading = `Area: ${area}`;


    const { data: areaCourses }
        = await axios.get(`http://localhost:${config.PORT}/api/courses/GE_ATTRIBUTE/${area}`);

    console.log(`HELPER areaCourses: `, areaCourses);

    let courses = [];

    for (const index in areaCourses) {
        const course = areaCourses[index];
        console.log(`COURSE: ${course}`);
        let item =
            {
                "label": "",
                "title": `${course.CRSE}: ${course.CRSE_TITLE}`,
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
                                    "relativePath": `../students/wishlist/add/${studentID}/${course.POS_ID}/${area}`
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

    // Remove filler JSON Courses
    CourseSelectionJSON.content.pop();
    CourseSelectionJSON.content.pop();


    // Populate Courses
    for (const course of courses) {
        console.log(`course: `, course);
        CourseSelectionJSON.content.push(course);
    }

    // Get Unique Subjects of Courses
    const subjects = getUniqueSubjects(CourseSelectionJSON.content.slice(5))
    console.log(`GENCOURSESELEC Subjects: `, subjects)

    // Remove filler JSON Options
    CourseSelectionJSON.content[3].content[0].content[0].content[0].items[2].options = [];

    // Populate Subjects drop-down
    for (const subject of subjects) {
        console.log(`subject: `, subject);
        CourseSelectionJSON.content[3].content[0].content[0].content[0].items[2].options.push(subject);
    }

    return(CourseSelectionJSON);

}

module.exports = generateCourseSelectionScreen;