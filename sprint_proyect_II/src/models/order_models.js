const conexion=require('../data/conexion');
const mongoose=require('mongoose');



const order_schemas=mongoose.Schema({
    usuario:{
        ref:'user',
        type:mongoose.Types.ObjectId,
        require:true
    },
    way_pay:[{
        ref:'medioPago',
        type:mongoose.Types.ObjectId,
        required:true
    }],
    direccion:{
        type:String,
        required:true

    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    orderItem:{
        ref:'List',
        type:mongoose.Types.ObjectId,
        required:true 
    },
    state:{
        ref:'state',
        type:mongoose.Types.ObjectId,
        required:true
    }
});


const order=mongoose.model('order',order_schemas);

module.exports=order;


