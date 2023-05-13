const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API for CSE-341',
    description: 'Contacts API, week 4; personal assignment',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);