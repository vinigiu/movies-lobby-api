const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/index.ts',
  './modules/movies/routes/index.ts', 
  './modules/users/routes/index.ts'
];

const doc = {
    info: {
      title: 'Movies Lobby API',
      description: 'Provides resources to interact with Movies Lobby API',
    },
    host: "localhost:3333",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);