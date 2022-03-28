const product=require('../models/product_models');
const user_models=require('../models/user_models');
const Role=require('../models/roles');
const jwt=require('jsonwebtoken');
const client = require('../config/config_redis');
const {encrypto}=require('../service/encryted');
const {promisify}= require('util')
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);



//funcion que crea un nuevo usuario
exports.singnup=async(req,res)=>{

    try {
        let {usuario,nombre,apellido,email,telefono,direccion,password,roles}=req.body;

        const NewUser={
            usuario,
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            password:encrypto(password),
            roles
        }

        if (roles) {
            const foundRoles=await Role.find({name:{$in:roles}});
            NewUser.roles=foundRoles.map(role=>role._id);
        } else {
            const role=await Role.findOne({name:'user'});
            NewUser.roles=[role._id];
        }



        const new_user=await user_models.create(NewUser); 


        const token=jwt.sign({id:new_user._id},process.env.TOKEN_FIRMA,{
            expiresIn:900
        });
   
       res.status(200).json({
           auth:true,
           respuesta:"Usuario "+ new_user.usuario +" fue creado con exito",
           token:token
       }); 
   
        
    } catch (error) {
        res.status(400).json({
            error:true,
            msg:"error, no se pudo registra el usuario"
        });
    } 

   
}
//envia la lista del producto cuando el usaurio esta logeado.
exports.singnin=async(req,res)=>{
    try {
        
        const{usuario,password}=req.body;
        
        let dato={
            usuario,password:encrypto(password)
        }

        const user=await user_models.findOne(dato);
        const token=jwt.sign({id:user._id},process.env.TOKEN_FIRMA,{
            expiresIn:900
        });

        const cache= await getAsync('products')


        if(cache) return res.status(200).json({
            error:false,
            mensaje:"bienvenido, esta es la lista de productos: ",
            respuesta:JSON.parse(cache),
            token:token
        }) 

        const Product=await product.find();

        await setAsync("products",JSON.stringify(Product),'EX',10*60*60)


        res.status(200).json({
            error:false,
            mensaje:"bienvenido, esta es la lista de productos: ",
            respuesta:Product,
            token:token
        }) 
    

        
        
    } catch (error) {

        console.error(error)

        res.status(404).json({
            error:true,
            msg:"Ups! no se pudo ingresar",
            error:error
            
        });
        
    }
    
}
