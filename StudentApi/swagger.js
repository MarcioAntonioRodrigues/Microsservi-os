const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./controllers/StudentsController.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./controllers/StudentsController.js')
})