const axios = require("axios");
const config = require("../src/config");

async function getCourseSelectionScreenFiltered(area, postedContent) {
    console.log(`HELPER getCourseSelectionScreen: area: ${area}`);

    // Get Area Course Selection Screen JSON
    let areaCourseSelectionJSON =
        await axios.get(`http://localhost:${config.PORT}/api/modules/CourseSelection/${area}`);

    // Extract Courses JSON List from Content (everything after content[5])
    let coursesJSON = areaCourseSelectionJSON.data.content.slice(5);
    console.log(`HELPER getCourseSelectionScreen: coursesJSON: `, coursesJSON);

    // Print the submitted values
    for (const key in postedContent) {
        console.log(`Submitted value: ${key} = ${postedContent[key]}`);
    }

    const originalPostedContent = postedContent;

    // Clean and format the order_by_course_units value
    postedContent.order_by_course_units = String(postedContent.order_by_course_units).split(',').map(x => x.trim()).sort().join(',');

    if (postedContent.assisted_multiselect !== undefined) {
        console.log('assisted_multiselect:', postedContent.assisted_multiselect);

        // Get the subjects from the assisted_multiselect
        const subjects = typeof postedContent.assisted_multiselect === 'string' ? postedContent.assisted_multiselect.split(',') : postedContent.assisted_multiselect;

        console.log('subjects:', subjects);

        // If assisted_multiselect is not empty, filter the coursesJSON based on the subjects
        if (subjects.length > 0 && subjects[0] !== "") {
            console.log('coursesJSON before filter:', coursesJSON);

            coursesJSON = coursesJSON.filter(course => {
                // Extract the subject from the course title
                const courseSubject = course.title.split('<strong>')[1].split('-')[0];

                // Check if the subject is included in the subjects list
                return subjects.includes(courseSubject);
            });

            console.log('coursesJSON after filter:', coursesJSON);
        }
    }



    // Filter the coursesJSON based on the sem_offered_fall_spring value
    coursesJSON = coursesJSON.filter(course => {
        // Get the Typically Offered value from the course
        const typicallyOffered = course.content[0].content[0].html.split('Course Typically Offered: ')[1].split('<br>')[0];

        if (postedContent.sem_offered_fall_spring === '1') {
            return typicallyOffered.includes('NA') || typicallyOffered.includes('Fall');
        } else if (postedContent.sem_offered_fall_spring === '2') {
            return typicallyOffered.includes('NA') || typicallyOffered.includes('Spring');
        } else if (postedContent.sem_offered_fall_spring === '') {
            return !typicallyOffered.includes('Fall') || !typicallyOffered.includes('Spring');
        } else {
            return true;
        }
    });

    if (postedContent.order_by_course_units) {
        // If order_by_course_units = 1, sort the coursesJSON by course title
        if (postedContent.order_by_course_units === '1') {
            coursesJSON.sort((a, b) => {
                // Get the course titles (everything after the <small> tag)
                const titleA = a.title.split('<small>')[1].split('</small>')[0].replace(/[^A-Za-z0-9\s]/g, '');
                const titleB = b.title.split('<small>')[1].split('</small>')[0].replace(/[^A-Za-z0-9\s]/g, '');



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
                    return minUnitsB - minUnitsA;
                } else {
                    // Get the course titles (everything after the <strong> tag)
                    const codeA = a.title.split('<strong>')[1].split(':</strong>')[0];
                    const codeB = b.title.split('<strong>')[1].split(':</strong>')[0];

                    // If order_by_course_units = 2, sort by course.CRSE
                    if (postedContent.order_by_course_units === '2') {
                        return codeA.localeCompare(codeB);
                    } else {
                        // If order_by_course_units = 1,2, sort by course title
                        // Get the course titles (everything after the <small> tag)
                        const titleA = a.title.split('<small>')[1].split('</small>')[0].replace(/[^A-Za-z0-9\s]/g, '');
                        const titleB = b.title.split('<small>')[1].split('</small>')[0].replace(/[^A-Za-z0-9\s]/g, '');

                        if (titleA < titleB) return -1;
                        if (titleA > titleB) return 1;
                        return 0;
                    }
                }
            });
        }
    }

    console.log(`HELPER getCourseSelectionScreen: UPDATED coursesJSON: `, coursesJSON);

    // Replace original coursesJSON with the updated coursesJSON

    // Remove everything at and after content[5]
    areaCourseSelectionJSON.data.content.splice(5);

    // Add the filtered coursesJSON to the areaCourseSelectionJSON.data.content array
    areaCourseSelectionJSON.data.content.push(...coursesJSON);


    if (coursesJSON.length === 0) {
        // coursesJSON is empty
        areaCourseSelectionJSON.data.content[4].heading = 'No Courses Found!';
    }

    areaCourseSelectionJSON.data.content[3].content[0].content[0].content[0].items[0].value =
        originalPostedContent.sem_offered_fall_spring;

    areaCourseSelectionJSON.data.content[3].content[0].content[0].content[0].items[1].value =
        originalPostedContent.order_by_course_units;


    // Return updated areaCourseSelectionJSON
    return areaCourseSelectionJSON.data;
}

module.exports = getCourseSelectionScreenFiltered;