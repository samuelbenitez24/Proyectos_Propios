const conexion=require('../data/conexion');
const mongoose=require('mongoose');


const product_schemas=mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    precio:{
        type:Number,
        require:true
    }

},{
    timestamps:true,
    versionKey:false
});


const product=mongoose.model('products',product_schemas);
module.exports=product;
