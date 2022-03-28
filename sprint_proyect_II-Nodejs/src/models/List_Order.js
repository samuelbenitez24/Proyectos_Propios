const conexion=require('../data/conexion');
const mongoose=require('mongoose');

//schema Lista de pedidos
const Order_list_Schema=mongoose.Schema({
    _id:{ 
        ref:'order',
        type:mongoose.Types.ObjectId
    }
   
},{
    timestamps:true,
    versionKey:false
});



//ejecutando model de la lista de pedidos
const item=mongoose.model('OrdeList',Order_list_Schema);

module.exports=item;