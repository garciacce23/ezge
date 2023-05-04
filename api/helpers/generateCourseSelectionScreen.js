const { screens, components } = require('../templates');
const axios = require("axios");
const config = require("../src/config");
const templates = require("../templates");
const getUniqueSubjects = require("./getUniqueSubjects");


// Generate Course Selection Screen
async function generateCourseSelectionScreen(area) {
    // Get student id from JWT...
    const studentID = 123456789;

    // Copy Template JSON
    let CourseSelectionJSON = JSON.parse(JSON.stringify(templates.screens.CourseSelection));

    // Set Title to Area: Area Description

    const areasDict = {
        "A1": "Oral Communications",
        "A2": "Written Communication",
        "A3": "Critical Thinking",
        "B1": "Physical Science",
        "B2": "Life Science",
        "B4": "Quantitative Reasoning",
        "C1": "Arts",
        "C2": "Humanities",
        "D1": "American History",
        "D2": "Social Science",
        "E": "Lifelong Learning and Self-Development",
        "F": "Ethnic Studies"
    }

    const areaDescription = areasDict[area];
    CourseSelectionJSON.content[2].heading = `Area ${area}: ${areaDescription}`;


    // Set Form Submission Relative Link
    CourseSelectionJSON.content[3].content[0].content[0].content[0].relativePath = `./CourseSelection/${area}`;
    console.log(`Set Form Submission Relative Link: `, CourseSelectionJSON.content[5].content[0].content[1].link.relativePath);

    const { data: areaCourses } = await axios.get(`http://localhost:${config.PORT}/api/courses/GE_ATTRIBUTE/${area}`);

    //console.log(`HELPER areaCourses: `, areaCourses);

    let courses = [];

    for (const index in areaCourses) {
        const course = areaCourses[index];
        //console.log(`COURSE: ${course}`);
        let item =
            {
                "label": "",
                "title": `<strong>${course.CRSE}:</strong> <small>${course.CRSE_TITLE}</small>`,
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
                "elementType": "collapsible",
                "borderTopStyle": "none"
            }
        if (index === 0) {
            delete item.borderTopStyle;
        }

        courses.push(item);

    }

    // Remove filler JSON Courses
    CourseSelectionJSON.content.pop();
    CourseSelectionJSON.content.pop();


    // Populate Courses
    for (const course of courses) {
        //console.log(`course: `, course);
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
        const item =
        {
            "label": `${subject}`,
            "value": `${subject}`
        }

        CourseSelectionJSON.content[3].content[0].content[0].content[0].items[2].options.push(item);
    }

    return(CourseSelectionJSON);

}

module.exports = generateCourseSelectionScreen;