const axios = require('axios'), config = require('../src/config');

const templates = require('../templates');
const getWishlistedCourses = require("./getWishlistedCourses");
// const {getWishlistedAreas} = require("./index");

let AreasJSON = templates.screens.Areas;
let AreaWishlistJSON = templates.components.AreaWishlist;


// Generate the areas screen
async function generateAreasScreen() {

    // Get student id from JWT...
    const studentID = 123456789;

    AreasJSON.metadata.studentID = studentID;

    // Get GE Areas
    const { data: GEAreas } = await axios.get(`http://localhost:${config.PORT}/api/courses/GEs`);


    let path;

    console.log(`HELPER GEAreas: `, GEAreas)

    // Iterate over GE areas and generate json for each
    for (const area of GEAreas) {

        //let currentAreaWishlist = AreaWishlistJSON;

        // Get student wishlisted courses from db by studentID
        const wishlistedCourses = await getWishlistedCourses(studentID, area);
        console.log('RETURNED wishlistedCourses:', wishlistedCourses);
        console.log('RETURNED wishlistedCourses[0]:', wishlistedCourses[0]);


        let items = [];


        // Iterate over wishlisted courses in area and generate json for each
        for (const course of wishlistedCourses) {
            console.log(`course: `, course);
            //const courseItem = wishlistedCourses[course];

            console.log(`course title: `, course.CRSE);

            const item = {
                "title": course.CRSE_TITLE,
                "description": `Units: ${course.UNITS_RANGE}
                Typically Offered: ${course.CRSE_TYP_OFFR}`,
                "accessoryButton": {
                    "link": {
                        "relativePath": `../../students/wishlist/${studentID}/${course.POS_ID}` // Get pos_ID for course
                    },
                    "accessoryIcon": "delete",
                    "confirmationMessage": "Are you sure you want to delete this?"
                }
            };

            items.push(item);
            console.log(`item: `, item);

        }


        switch(area) {
            case "A1":
                // Generate A1 Wishlist JSON
                AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[0].content[0].items = items;
                break;
            case "A2":
                // Generate A2 Wishlist JSON
                AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[1].content[0].items = items;
                break;
            case "A3":
                // Generate A3 Wishlist JSON
                AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[2].content[0].items = items;
                break;
            case "B4":
                // Generate B4 Wishlist JSON
                console.log(`AreasJSON: `, AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[3].content[0].items);

                AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[3].content[0].items = items;
                console.log(`B4 WISHLIST`);

                console.log(`items: `, items);

                break;
            case "B1":
                // Generate B1 Wishlist JSON
                AreasJSON.content[1].content[1].content[0].content[2]
                    .content[0].content[0].tabs[0].content[0].items = items;
                break;
            case "B2":
                // Generate B2 Wishlist JSON
                AreasJSON.content[1].content[1].content[0].content[2]
                    .content[0].content[0].tabs[1].content[0].items = items;
                break;
            case "B3":
                // Generate B3 Wishlist JSON
                AreasJSON.content[1].content[1].content[0].content[2]
                    .content[0].content[0].tabs[2].content[0].items = items;
                break;
            case "C1":
                // Generate C1 Wishlist JSON
                AreasJSON.content[1].content[2].content[0].content[2]
                    .content[0].content[0].tabs[0].content[0].items = items;
                break;
            case "C2":
                // Generate C2 Wishlist JSON
                AreasJSON.content[1].content[2].content[0].content[2]
                    .content[0].content[0].tabs[1].content[0].items = items;
                break;
            case "D1":
                // Generate D1 Wishlist JSON
                AreasJSON.content[1].content[3].content[0].content[2]
                    .content[0].content[0].tabs[0].content[0].items = items;
                break;
            case "D2":
                // Generate D2 Wishlist JSON
                AreasJSON.content[1].content[3].content[0].content[2]
                    .content[0].content[0].tabs[1].content[0].items = items;
                break;
            case "E":
                // Generate E Wishlist JSON
                AreasJSON.content[1].content[4].content[0].content[2]
                    .content[0].content[0].items = items;
                break;
            case "F":
                // Generate F Wishlist JSON
                AreasJSON.content[1].content[5].content[0].content[2]
                    .content[0].content[0].items = items;
                break;
            default:
            // Generate default Wishlist JSON
                console.log(`Defaulting - No area found!`);

        }

        // Add items to wishlist
        //AreasJSON.path = items;
    }

    // Go back in and add C1/C2 Tab JSON
    let c12 = [];

    let c1s = AreasJSON.content[1].content[2].content[0].content[2]
        .content[0].content[0].tabs[0].content[0].items;
    for (item in c1s) {
        if (item > 0) {
            c12.push(c1s[item]);
        }
    }

    let c2s = AreasJSON.content[1].content[2].content[0].content[2]
        .content[0].content[0].tabs[1].content[0].items;

    for (item in c2s) {
        if (item > 0) {
            c12.push(c2s[item]);
        }
    }


    AreasJSON.content[1].content[2].content[0].content[2].
        content[0].content[0].tabs[2].content[0].items = c12;


    // Return Modified Screen JSON
    console.log(`AREAS JSON: `, AreasJSON);
    return(AreasJSON);


}


// Export Function
module.exports = generateAreasScreen;