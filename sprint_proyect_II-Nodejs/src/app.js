//inicializacion de express
const express =require("express");
//invoco a expre en una variable app
const app=express();

//recursos para el funcionamiento de swagger
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');

const {swaggerOptions}=require('../src/config/swaggerOptions');

const spect=swaggerJsDoc(swaggerOptions);

//Middleware para recurso(ruta no encontrada)
const { Error404, Error500SyntaxError } = require("./middleware/errorHandler");

//midlewere
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/products',require('./routes/product.routes'));
app.use('/api/order',require('./routes/order.routes'));
app.use('/api/payment',require('./routes/mediosPago.routes'));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(spect));
app.use(Error404);
app.use(Error500SyntaxError);


module.exports=app;