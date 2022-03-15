require('dotenv').config()
//levantar servidor con express
const express =require("express");

const app=express();

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');

const {swaggerOptions}=require('../src/config/swaggerOptions');

const helmet=require('helmet');

const {createRoles}=require('../src/libs/initialsetup');

const {medios_por_defectos}=require('../src/libs/initialmediospagos');

const { State } = require("./libs/InitialState");

const spect=swaggerJsDoc(swaggerOptions);

const morgan=require('morgan');

const { Error404 } = require("./middleware/errorHandler");


//funciones para crear roles , medios de pagos y estados automaticamente en la bd
createRoles();
medios_por_defectos();
State();

//setting
app.set('port',process.env.PORT || 3000);

//midlewere
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan('dev'))


//routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/products',require('./routes/product.routes'));
app.use('/api/order',require('./routes/order.routes'));
app.use('/api/payment',require('./routes/mediosPago.routes'));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(spect));
app.use(Error404);



//Escucha servidor y puerto
app.listen(app.get('port'),()=>{
    console.log("server on port "+app.get('port'));
});


module.exports=app;