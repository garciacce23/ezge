const axios = require('axios');

async function getOnWishlistGEAttributes(studentID) {
    try {
        // Make a GET request to the API endpoint
        const response = await
            axios.get(`http://localhost:${config.PORT}/api/students/studentID/${studentID}`);

        // Parse the JSON data
        const data = response.data;

        // Get the onWishList GE_ATTRIBUTES
        const onWishlistGEAttributes =
            data[0].undergradRequirements.onWishList.map((item) => item.GE_ATTRIBUTE);

        return onWishlistGEAttributes;

    } catch (error) {
        console.error(`Error fetching student data: ${error}`);
        throw error;
    }
}

module.exports = getOnWishlistGEAttributes;
