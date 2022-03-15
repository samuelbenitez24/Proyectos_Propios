exports.swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: ' API RESTAURANT',
      version: '2.0.0',
      contact: 'samuelbenitex750@gmail.com',
      description: 'order system Api'
    },
    servers: [
      {
        url:process.env.URL_SWAGGER
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['../src/routes/*.js','./src/routes/*.js']
}
