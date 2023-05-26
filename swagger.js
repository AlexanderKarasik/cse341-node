const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: ' API for Football Players',
    description: 'Football Players API, week 5; personal assignment',
  },
  host: 'cse341-node-football-project.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);