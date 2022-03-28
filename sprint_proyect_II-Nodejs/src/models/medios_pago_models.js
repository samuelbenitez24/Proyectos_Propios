const conexion=require('../data/conexion');
const mongoose=require('mongoose');

//schema de medios de pago
const medios_pago_schemas=mongoose.Schema({
    medio:{
        type:String,
        required:true
    }

},{
    timestamps:true,
    versionKey:false
});

// ejecuta el modelo de los medios de pogo
const medio=mongoose.model('medioPago',medios_pago_schemas);


module.exports=medio;