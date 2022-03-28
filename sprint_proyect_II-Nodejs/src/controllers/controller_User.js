//se traen los objetos usuarios y productos de un archivo externo
const user_models=require('../models/user_models');
const Role=require('../models/roles');
const jwt=require('jsonwebtoken');
const {encrypto}=require('../service/encryted');
const { findById } = require('../models/user_models');

//accciones que realiza el usaurio
//trae toda la lista de usuarios
const get_users=async(req,res)=>{
    try {
        const users=await user_models.find()
        .populate('roles')
        .populate({path:'order',populate:[{path:'_id',model:'order'}]});
        
        res.status(200).json(users);
        
    } catch (error) {
        res.status(400).json("Error a traer lista de usuario!!! ");
    }
    
}

//trae el usuario mediante id
const get_user=async(req,res)=>{

    try {
        const {id}=req.params;
        const user = await user_models.findById({_id:id})
        .populate("roles")
        .populate({path:'order',populate:[{path:'_id',model:'order'}]}) || null;

        if(user===null) throw new Error

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            mensaje:"No se encontro ningun usaurio con ese id"
        });
        
    }
}

//bloqueo de usuario
const put_discontinued= async (req,res)=>{
    try {
        const {id}=req.params;

        const User=await user_models.findById({_id:id})
     

        if(User.discontinued===false){
            const user = await user_models.findByIdAndUpdate({_id:id},{discontinued:true},{new:true});
            res.status(200).json({
                msg:"El usuario "+user.usuario+" esta suspendido"
            });

        }else if(User.discontinued===true){
            const user = await user_models.findByIdAndUpdate({_id:id},{discontinued:false},{new:true});
            res.status(200).json({
                msg:"El usuario "+user.usuario+" dejo de estar suspendido"
            });

        }  
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg: "error al bloquear al usuario",
            res:error
        })
    }

}


//modificacion de usuario
const put_user=async(req,res)=>{
    try {
        const{usuario,email,telefono,password}=req.body;

        const token=req.headers.authorization.split(' ')[1];
        const decodificar=jwt.decode(token,process.env.TOKEN_FIRMA);
        const id=decodificar.id;


        if (usuario && email && telefono && password ) {
            const dato={
                usuario,
                email,
                telefono,
                password:encrypto(password)
            }
            const user=await user_models.findByIdAndUpdate({_id:id},dato,{new:true}); 
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
           
        }else if(usuario) {
            const user=await user_models.findByIdAndUpdate({_id:id},{usuario:usuario},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usuario"
            });

        }else if(email) {
            let expresion =/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

            if (!expresion.test(email)) {
               res.status(400).json({
                respuesta:"Email Invalido"
               });
            }else{
                const user=await user_models.findByIdAndUpdate({_id:id},{email:email},{new:true});
                if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
                res.status(200).json({
                    msg:"se pudo actulizar la informacion del usuario"
                });
            }

        }else if(telefono) {
            const ExpRegSoloNumeros=/^[0-9]+$/;
            if(!telefono.match(ExpRegSoloNumeros)){
                res.status(400).json({
                    respuesta:"numero de telefono invalido"
                   });

            }else{
                const user=await user_models.findByIdAndUpdate({_id:id},{telefono:telefono},{new:true});
                if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
                res.status(200).json({
                    msg:"se pudo actulizar la informacion del usuario"
                });
            }
            

        }else if(password) {
            const user=await user_models.findByIdAndUpdate({_id:id},{password:encrypto(password)},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usuario"
            });

        }
        
    } catch (error) {

        console.log(error);

        res.status(400).json({
            msg:"error, en actualizar usuario"

        });

        
    }

}

//modifica los roles del usuario
const put_role_user=async (req,res)=>{
    try {
        const{id}=req.params;
        const{rol}=req.body;

        if(rol.length===0) throw new Error

        if(rol) {

            const foundRoles=await Role.find({name:{$in:rol}});
            const Rol=foundRoles.map(role=>role._id);
            
            const user=await user_models.findByIdAndUpdate({_id:id},{roles:Rol},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"roles del usuario actualizado"
            });
        }


        
    } catch (error) {
        res.status(400).json({
            msg:"error, en actualizar el rol del usuario"

        });
        
    }
}

//elimina un usuario mediante id
const Delete_user=async(req,res)=>{
    try {

        const {id}=req.params;
        await user_models.findByIdAndDelete({_id:id});

        res.json({
            msg:"usuario eliminado con exito",
        });
        
    } catch (error) {

        if (error) return res.json({
            msg:"error, en eliminar usuario",
            error:error
        });
        
    }

}



exports.get_users=get_users;

exports.get_user=get_user;

exports.put_user=put_user;

exports.put_role_user=put_role_user;

exports.put_discontinued=put_discontinued;

exports.Delete_user=Delete_user;