const conexion=require('../data/conexion');
const mongooose=require('mongoose');


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


const state=mongooose.model('state',state_schemas);

module.exports=state;