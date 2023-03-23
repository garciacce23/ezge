const config = require('./config');
const PORT = config.PORT; // Get port from config file

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'EZGE API with Swagger',
        version: '1.0.0',
        description: 'EZGE API with Swagger Documentation',
    },
    servers: [
        {
            url: 'https://www.ezge152.link/api',
            description: 'Production server'
        },
        {
            url: `http://localhost:${PORT}/api`,
            description: 'Local server',
        },
    ]
};

module.exports = swaggerDefinition;
