const conexion=require('../data/conexion');
const mongoose=require('mongoose');

//schema de lista de productos
const List_order_Schemas=mongoose.Schema ({
    producto:[{
        _id:{
            ref: 'products',
            type: mongoose.Schema.ObjectId,
            required: [true,'Campo id producto es requerido.']
        },
        N_product:{
            type:Number,
            required:true
        },
        quantity_of_product:{
            type:Number,
            required:true
        }

    }]

},{
    timestamps:true,
    versionKey:false
});


//se ejecuta modelo de la lista de pedidos
const New_list=mongoose.model('List',List_order_Schemas);



module.exports=New_list;