const { screens, components } = require('../templates');
const axios = require("axios");
const config = require("../src/config");
const templates = require("../templates");
const fs = require('fs');

async function getCourseSelectionScreenFiltered(area, postedContent) {
    console.log(`HELPER getCourseSelectionScreen: area: ${area}`);

    // Get Area Course Selection Screen JSON
    let areaCourseSelectionJSON =
        await axios.get(`http://localhost:${config.PORT}/api/modules/CourseSelection/${area}`);

    // Extract Courses JSON List from Content (everything after content[5])
    let coursesJSON = areaCourseSelectionJSON.data.content.slice(5);

    // Print the submitted values
    for (const key in postedContent) {
        console.log(`Submitted value: ${key} = ${postedContent[key]}`);
    }

    // Get the subjects from the assisted_multiselect
    const subjects = postedContent.assisted_multiselect.split(',');

    // If assisted_multiselect is not empty, filter the coursesJSON based on the subjects
    if (subjects.length > 0 && subjects[0] !== "") {
        coursesJSON = coursesJSON.filter(course => {
            // Extract the subject from the course title
            const courseSubject = course.title.split(':')[0];

            // Check if the subject is included in the subjects list
            return subjects.includes(courseSubject);
        });
    }

    // Filter the coursesJSON based on the sem_offered_fall_spring value
    coursesJSON = coursesJSON.filter(course => {
        // Get the Typically Offered value from the course
        const typicallyOffered = course.content[0].content[0].html.split('Course Typically Offered: ')[1].split('<br>')[0];

        if (postedContent.sem_offered_fall_spring === '1') {
            return typicallyOffered === 'NA' || typicallyOffered === 'Fall';
        } else if (postedContent.sem_offered_fall_spring === '2') {
            return typicallyOffered === 'NA' || typicallyOffered === 'Spring';
        } else if (postedContent.sem_offered_fall_spring === '') {
            return typicallyOffered === 'NA';
        } else {
            return true;
        }
    });

    if (postedContent.order_by_course_units) {
        // If order_by_course_units = 1, sort the coursesJSON by course title
        if (postedContent.order_by_course_units === '1') {
            coursesJSON.sort((a, b) => {
                // Get the course titles (everything after the colon)
                const titleA = a.title.split(': ')[1];
                const titleB = b.title.split(': ')[1];

                // Compare the course titles and return the appropriate value for sorting
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            });
        } else if (postedContent.order_by_course_units === '2' || postedContent.order_by_course_units === '1,2') {
            coursesJSON.sort((a, b) => {
                // Get the units range (everything after Units: and before the <br>)
                const unitsA = a.content[0].content[0].html.split('Units: ')[1].split('<br>')[0];
                const unitsB = b.content[0].content[0].html.split('Units: ')[1].split('<br>')[0];

                // Get the minimum units for each course
                const minUnitsA = parseInt(unitsA.split('-')[0]);
                const minUnitsB = parseInt(unitsB.split('-')[0]);

                // Sort by units
                if (minUnitsA !== minUnitsB) {
                    return minUnitsA - minUnitsB;
                } else {
                    // Get the course code (everything before the colon)
                    const codeA = a.title.split(':')[0];
                    const codeB = b.title.split(':')[0];

                    // If order_by_course_units = 2, sort by course.CRSE
                    if (postedContent.order_by_course_units === '2') {
                        return codeA.localeCompare(codeB);
                    } else {
                        // If order_by_course_units = 1,2, sort by course title
                        const titleA = a.title.split(': ')[1];
                        const titleB = b.title.split(': ')[1];

                        if (titleA < titleB) return -1;
                        if (titleA > titleB) return 1;
                        return 0;
                    }
                }
            });
        }
    }

    // Replace original coursesJSON with the updated coursesJSON
    areaCourseSelectionJSON.data.content.splice(5, coursesJSON.length, ...coursesJSON);

    // Return updated areaCourseSelectionJSON
    return areaCourseSelectionJSON.data;
}

module.exports = getCourseSelectionScreenFiltered;