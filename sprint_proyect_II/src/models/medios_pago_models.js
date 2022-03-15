const conexion=require('../data/conexion');
const mongoose=require('mongoose');


const medios_pago_schemas=mongoose.Schema({
    medio:{
        type:String,
        required:true
    }

},{
    timestamps:true,
    versionKey:false
});


const medio=mongoose.model('medioPago',medios_pago_schemas);


module.exports=medio;