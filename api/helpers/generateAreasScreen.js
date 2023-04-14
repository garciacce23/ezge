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

    // Get GE Areas
    const { data: GEAreas } = await axios.get(`http://localhost:${config.PORT}/api/courses/GEs`);


    let path;

    // Iterate over GE areas and generate json for each
    for (const area in GEAreas) {

        //let currentAreaWishlist = AreaWishlistJSON;

        // Get student wishlisted courses from db by studentID
        const wishlistedCourses = await getWishlistedCourses(studentID, area);
        console.log('RETURNED wishlistedCourses:', wishlistedCourses);
        console.log('RETURNED wishlistedCourses[0]:', wishlistedCourses[0]);


        let items = [];


        // Iterate over wishlisted courses in area and generate json for each
        for (const course in wishlistedCourses) {
            console.log(`course: `, course);
            const courseItem = wishlistedCourses[course];

            console.log(`course title: `, courseItem.CRSE);

            const item = {
                "title": courseItem.CRSE,
                "description": `Units: ${courseItem.UNITS_RANGE}`, // Get units from course
                "accessoryButton": {
                    "link": {
                        "relativePath": "" // Get pos_ID for course
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
                AreasJSON.content[0].content[1].content[0].content[2]
                    .content[0].content[0].tabs[3].content[0].items = items;
                break;
            case "B1":
                // Generate B1 Wishlist JSON
                break;
            case "B2":
                // Generate B2 Wishlist JSON
                break;
            case "B3":
                // Generate B3 Wishlist JSON
                break;
            case "C1":
                // Generate C1 Wishlist JSON
                break;
            case "C2":
                // Generate C2 Wishlist JSON
                break;
            case "D1":
                // Generate D1 Wishlist JSON
                break;
            case "D2":
                // Generate D2 Wishlist JSON
                break;
            case "E":
                // Generate E Wishlist JSON
                break;
            case "F":
                // Generate F Wishlist JSON
                break;
            default:
            // Generate default Wishlist JSON
        }

        // Add items to wishlist
        //AreasJSON.path = items;
    }


    // Return Modified Screen JSON
    return(AreasJSON);

}


// Export Function
module.exports = generateAreasScreen;