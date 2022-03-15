const conexion=require('../data/conexion');
const mongoose=require('mongoose');


const user_schemas=mongoose.Schema({
    usuario:{
        type:String,
        require:true ,
        min: 50,
        max: 255 
    },
    nombre:{
        type:String,
        required:true ,
        min: 50,
        max: 255 
    },
    apellido:{
        type:String,
        required:true ,
        min: 50,
        max: 255 
    },
    email:{
        type:String,
        required:true

    },
    telefono:{
        type:String,
        required:true  
    },
    direccion:[{
        type:String,
        required:true 
    }], 
    password:{
        type:String,
        required:true
    },
    locked:{
        type:Boolean,
        default:false

    },
    roles:[{
        ref:'Role',
        type:mongoose.Schema.Types.ObjectId
    }],
    order:[{
        _id:{
            ref:'order',
            type:mongoose.Types.ObjectId
        }
    }]

},{
    timestamps:true,
    versionKey:false
});



const user=mongoose.model('user',user_schemas);


module.exports=user;

