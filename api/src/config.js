require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.API_PORT || 4000; // Get port from .env file
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB URI from .env file

// Export config.js
module.exports = { PORT, MONGO_URI };