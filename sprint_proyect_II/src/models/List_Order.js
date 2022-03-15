const conexion=require('../data/conexion');
const mongoose=require('mongoose');


const Order_list_Schema=mongoose.Schema({
    _id:{ 
        ref:'order',
        type:mongoose.Types.ObjectId
    }
   
},{
    timestamps:true,
    versionKey:false
});


const item=mongoose.model('OrdeList',Order_list_Schema);

module.exports=item;