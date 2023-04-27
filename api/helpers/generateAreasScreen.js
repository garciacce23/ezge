const axios = require('axios');
const config = require('../src/config');

const templates = require('../templates');
const getWishlistedCourses = require("./getWishlistedCourses");
const getUndergradRequirements = require("./getUndergradRequirements");
const AreaPathResolverClass = require("./areaPathResolver");
const _ = require('lodash');


let AreasJSON = templates.screens.Areas;
let AreaWishlistJSON = templates.components.AreaWishlist;


// Generate the areas screen
async function generateAreasScreen() {

    // Get student id from JWT...
    const studentID = 123456789;

    AreasJSON.metadata.studentID = studentID;

    // Get GE Areas
    const { data: GEAreas } = await axios.get(`http://localhost:${config.PORT}/api/courses/GEs`);
    console.log(`HELPER GEAreas: `, GEAreas)

    const AreaPathResolver = new AreaPathResolverClass();

    /// Generate Wishlist ///

    // Iterate over GE areas and generate json for each
    for (const area of GEAreas) {

        // Get student wishlisted courses from db by studentID
        const wishlistedCourses = await getWishlistedCourses(studentID, area);
        console.log('RETURNED wishlistedCourses:', wishlistedCourses);
        console.log('RETURNED wishlistedCourses[0]:', wishlistedCourses[0]);


        let wishlistJSON = [];


        // Iterate over wishlisted courses in area and generate json for each
        for (const course of wishlistedCourses) {
            console.log(`course: `, course);
            //const courseItem = wishlistedCourses[course];

            console.log(`course title: `, course.CRSE);

            const item = {
                "title": course.CRSE_TITLE,
                "description": `<p>Units: ${course.UNITS_RANGE} <br>
                Typically Offered: ${course.CRSE_TYP_OFFR} </p>`,
                "accessoryButton": {
                    "link": {
                        "relativePath": `../students/wishlist/remove/${studentID}/${course.POS_ID}` // Get pos_ID for course
                    },
                    "accessoryIcon": "delete",
                    "confirmationMessage": "Are you sure you want to delete this?"
                }
            };

            wishlistJSON.push(item);
            console.log(`item: `, item);

        }

        // Get the JSON Path for the current Area Wishlist
        const path = AreaPathResolver.getWishlistPath(area);

        if (path) {
            // Set the wishlist JSON for the current area
            _.set(AreasJSON, path, wishlistJSON);
        } else {
            console.log(`No path found for area ${area}`);
        }

    }

    // Go back in and add C1/C2 Tab JSON
    let c12 = [];

    let c1path = AreaPathResolver.getWishlistPath('C1');
    let c1s = _.get(AreasJSON, c1path)
    for (let item in c1s) {
        if (item > 0) {
            c12.push(c1s[item]);
        }
    }

    let c2path = AreaPathResolver.getWishlistPath('C2');
    let c2s = _.get(AreasJSON, c2path)

    for (let item in c2s) {
        if (item > 0) {
            c12.push(c2s[item]);
        }
    }

    const c12Path = AreaPathResolver.getWishlistPath('C12');
    _.set(AreasJSON, c12Path, c12);








    /// Assign Icons ///
    const checkmark
        = `https://www.ezge152.link/images/checkmark`;
    const hourglass
        = 'https://cdn-icons-png.flaticon.com/512/5801/5801495.png';
    const exclamation
        = 'https://www.pngmart.com/files/15/Red-Exclamation-Mark-PNG-Background-Image.png';




    // Get undergrad requirements
    const undergradRequirements = await getUndergradRequirements(studentID);
    console.log(`undergradRequirements: `, undergradRequirements);

    // Instantiate the AreaPathResolver
    const areaResolver = new AreaPathResolverClass();


    const c1Completed = undergradRequirements.completed.filter(item => item.GE_ATTRIBUTE === 'C1').length;
    const c2Completed = undergradRequirements.completed.filter(item => item.GE_ATTRIBUTE === 'C2').length;

    const c1C2Completed = c1Completed + c2Completed;

    const c1Progress = undergradRequirements.inProgress.filter(item => item.GE_ATTRIBUTE === 'C1').length;
    const c2Progress = undergradRequirements.inProgress.filter(item => item.GE_ATTRIBUTE === 'C2').length;
    const c12Progress = c1Progress + c2Progress;

    const path = areaResolver.getAreaPath('C12');
    const urlPath = path + `.image.url`;

    if (c1Completed >= 1 && c2Completed >= 1 && c1C2Completed >= 3) {
        _.set(AreasJSON, urlPath, checkmark);
    }
    else if (c1Completed >= 1 && c2Completed >= 1 && c12Progress < 0) {
        _.set(AreasJSON, urlPath, hourglass);
    }
    else {
        _.set(AreasJSON, urlPath, exclamation);
    }




    // Iterate over Undergrad requirements and generate icon JSON for each
    for (let item of undergradRequirements.incomplete) {
        const path = areaResolver.getAreaPath(item.GE_ATTRIBUTE);
        if (!path) {
            continue;
        }

        const urlPath = path + `.image.url`;
        _.set(AreasJSON, urlPath, exclamation);
    }

    for (let item of undergradRequirements.inProgress) {
        console.log(`Undergrad requirements in progress: `, item.GE_ATTRIBUTE);
        const path = areaResolver.getAreaPath(item.GE_ATTRIBUTE);
        if (!path) {
            continue;
        }

        const urlPath = path + '.image.url';

        _.set(AreasJSON, urlPath, hourglass);
    }

    for (let item of undergradRequirements.completed) {
        const path = areaResolver.getAreaPath(item.GE_ATTRIBUTE);
        if (!path) {
            continue;
        }

        const urlPath = path + `.image.url`;
        _.set(AreasJSON, urlPath, checkmark);
    }



    // Return Modified Screen JSON
    console.log(`AREAS JSON: `, AreasJSON);
    return(AreasJSON);

}


// Export Function
module.exports = generateAreasScreen;