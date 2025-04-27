// swaggerSpec.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation',
        version: '1.0.0',             
        description: 'Documentation for my Express API',
    },
    servers: [
        {
            url: 'http://localhost:3000', 
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/Modules/Favorite/Service/favorite.service.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
