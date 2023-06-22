const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: ' API for Football Players',
    description: 'Football Players API, week 5; personal assignment',
  },
  host: 'localhost:8080',
  schemes: ['http'],

  security: {
    oauth2: {
      type: "oauth2",
      flows: {
        implicit: {
          authorizationUrl: process.env.ISSUER_BASE_URL,
          scopes: {
            read: "Grants read access",
            write: "Grants write access"
          }
        }
      }
    }
  }

};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);