const conexion=require('../data/conexion');
const mongooose=require('mongoose');


const roles_schemas=mongooose.Schema({
    name:{
        type:String
    },
    
},{
    versionkey:false
});


const roles=mongooose.model('Role',roles_schemas);

module.exports=roles;