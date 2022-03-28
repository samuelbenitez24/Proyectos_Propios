//llama a las varibales de entorno 
require('dotenv').config()

//levantar servidor con express
const app=require('./app')

//helmet
const helmet=require('helmet');

//invoca a initial
const {initial}=require('./libs/InitialAll');

//inicia los roles, states y Payment
initial();

//meddlewear
app.use(helmet());

//setting
app.set('port',process.env.PORT || 3000);

//Escucha servidor y puerto
app.listen(app.get('port'),()=>{
    console.log("server on port "+app.get('port'));
});
