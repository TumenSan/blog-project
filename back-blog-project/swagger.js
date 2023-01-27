const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
//const endpointsFiles = ['./routers/personRouter.js']
const endpointsFiles = ['app.js']

swaggerAutogen(outputFile, endpointsFiles)


//npm install swagger-autogen and swagger-ui-express
//npm run swagger-autogen