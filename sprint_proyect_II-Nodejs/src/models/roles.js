const conexion=require('../data/conexion');
const mongooose=require('mongoose');

//schema de roles
const roles_schemas=mongooose.Schema({
    name:{
        type:String
    },
    
},{
    versionkey:false
});

//ejecuta el modelos de roles
const roles=mongooose.model('Role',roles_schemas);

module.exports=roles;