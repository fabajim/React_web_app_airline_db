import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

// const isProd = process.env.NODE_ENV === 'production';

// const apisPath = isProd 
//   ? path.join(__dirname, '../routes/*.ts')
//   : path.join(process.cwd(), 'server.ts');

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AirlineDB API',
      version: '1.0.0',
      description: 'API documentation for Airline Management System'
    },
    servers: [
      {
        url: 'http://localhost:8081',
        description: 'Development server'
      }
    ]
  },
  apis: ["./src/server.ts", "./scr/database/**/*.ts", "./src/routes/*.ts", "./src/config/swaggerSchemas/*.ts"]// where Swagger reads annotations
};

export const swaggerSpec = swaggerJsdoc(options);