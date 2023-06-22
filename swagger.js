const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: ' Task-master API',
    description: 'Task-master API, CSE-341, Final Team Project',
  },
  host: 'task-master-lhx0.onrender.com',
  schemes: ['https'],

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