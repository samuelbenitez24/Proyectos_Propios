//se traen los objetos usuarios y productos de un archivo externo
const user_models=require('../models/user_models');
const {encrypto}=require('../service/encryted');
const Role=require('../models/roles');


//accciones que realiza el usaurio
//trae toda la lista de usuarios
const get_users=async(req,res)=>{
    try {
        const users=await user_models.find().populate("roles");
        
        res.status(200).json(users);
        
    } catch (error) {
        res.status(400).json("Error a traer lista de usuario!!! ");
    }
    
}

//trae el usuario mediante id
const get_user=async(req,res)=>{

    try {
        const {id}=req.params;
        const user = await user_models.findById({_id:id}).populate("roles") || null;

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

const put_locked= async (req,res)=>{
    try {
        const {id}=req.params;

        const {locked} = req.body;

        if(!locked) throw Error

        const user = await user_models.findByIdAndUpdate({_id:id},{locked:locked},{new:true});

        res.status(200).json({
            msg:"El usuario "+user.usuario+" fue bloqueado"
        });
        
    } catch (error) {
        res.status(400).json({
            msg: "error al bloquear al usuario",
            res:error
        })
    }

}


//modificacion de usuario
const put_user=async(req,res)=>{
    try {
        const{id}=req.params;
        const{usuario,email,telefono,direccion,password,rol}=req.body;

        const dato={
            usuario,
            email,
            telefono,
            direccion,
            password,
            rol 
        }

        if (usuario && email && telefono && direccion && password && rol) {
            const user=await user_models.findByIdAndUpdate({_id:id},dato,{new:true}); 
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
           
        } else if(usuario) {
            const user=await user_models.findByIdAndUpdate({_id:id},{usuario:dato.usuario},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        } else if(email) {
            const user=await user_models.findByIdAndUpdate({_id:id},{email:dato.email},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        } else if(telefono) {
            const user=await user_models.findByIdAndUpdate({_id:id},{telefono:dato.telefono},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        } else if(direccion) {
            const user=await user_models.findByIdAndUpdate({_id:id},{direccion:dato.direccion},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        } else if(password) {
            const user=await user_models.findByIdAndUpdate({_id:id},{password:encrypto(dato.password)},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        } else if(rol) {

            if (rol) {
                const foundRoles=await Role.find({name:{$in:rol}});
                dato.rol=foundRoles.map(role=>role._id);
            } else {
                const role=await Role.findOne({name:'user'});
                dato.rol=[role._id];
            }
            
            const user=await user_models.findByIdAndUpdate({_id:id},{roles:dato.rol},{new:true});
            if(!user) return res.status(400).json({error: 'Usuario no encontrado'});
            res.status(200).json({
                msg:"se pudo actulizar la informacion del usaurio"
            });
        }
        
    } catch (error) {

        res.status(400).json({
            msg:"error, en actualizar usuario"

        });

        
    }

}

//elimina un usuario mediante id
const Delete_user=async(req,res)=>{
    try {

        const {id}=req.params;
        await user_models.findByIdAndDelete(id,{new:true});

        const List_user=await user_models.find();

        res.json({
            msg:"usuario eliminado con exito",
            respuesta:List_user
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

exports.put_locked=put_locked;

exports.Delete_user=Delete_user;