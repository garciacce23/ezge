const axios = require('axios');
const config = require('../src/config');

async function getOnWishlistGEAttributes(studentID) {
    try {
        // Make a GET request to the API endpoint
        const response = await
            axios.get(`http://localhost:${config.PORT}/api/students/studentID/${studentID}`);

        // Parse the JSON data
        const data = response.data;

        // Get the onWishList GE_ATTRIBUTES
        const reqs = data[0].undergradRequirements;

        return reqs;

    } catch (error) {
        console.error(`Error fetching student data: ${error}`);
        throw error;
    }
}

module.exports = getOnWishlistGEAttributes;