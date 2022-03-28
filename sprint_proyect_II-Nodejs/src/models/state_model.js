const conexion=require('../data/conexion');
const mongooose=require('mongoose');

//schema de estados
const state_schemas=mongooose.Schema({
    name:{
        type:String,
        require:true

    },
    state:{
        type:Boolean,
        required:true
    }
    
},{
    versionKey:false
});

//ejecuta modelo de estados
const state=mongooose.model('state',state_schemas);

module.exports=state;