//llamar al objeto usuarios del archivo externo
const user_models=require('../models/user_models');
const {encrypto}=require('../service/encryted');

exports.validar_Campos_Login=async(req,res,next)=>{

    try {
        const {usuario,password}=req.body;

        if (!usuario || usuario==="" || !password === "") {
            throw new Error
        
        } else {
            return next();
        
        }
        
    } catch (error) {

        res.status(400).json({
            msg:'Error al ingresar, todos los campos son requeridos'
        });
        
    }
};



//verifica que el usuario este logeado 
exports.Login=async(req,res,next)=>{

    try {
        const {usuario,password}=req.body;

        const datos_entrada={
            usuario,password:encrypto(password)
        }
        
        const user=await user_models.findOne(datos_entrada);

        if (!user) {
            res.status(400).json({
               error:true,
               msg:"usuario incorrecto"
            });
        
        } else {
            return next();
        
        }
        
    } catch (error) {

        res.json({
            msg:'hubo un error'
        });
        
    }
    

   
    
};


//verifica que los campos esten completos para crear un nuevo usuario
exports.create_User=(req, res,next)=>{

    const {usuario,nombre,apellido,email,telefono,direccion,pass,roles}=req.body;
    let expresion =/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    
    if (!expresion.test(email)) {
        res.status(400).json({
            respuesta:"Email Invalido"
        });
            
    }else if (usuario=="" || nombre=="" || apellido=="" || email=="" || telefono=="" || direccion==""|| pass=="") {
        res.status(400).json({
            respuesta:"Todos los campos necesarios"
        });
    }else{
        next();
    }
    

}; 
//verifica si el usuario esta bloqueado
exports.lockedUser = async (req,res,next)=>{

    const {usuario,password}=req.body;

    const dato_entrada={
        usuario,
        password:encrypto(password)
    }

    const user=await user_models.findOne(dato_entrada);


    if(user.locked===true) return res.status(401).json({msg:"esta bloqueado"})

    return next()

}

//verifica si hay mail duplicados

exports.Duplicate_user=async(req,res,next)=>{
    try {
        const {usuario,email}=req.body;

        const User={
            usuario,
            email
        }
    
        const user=await user_models.findOne(User) || null;

        if (user!=null) return res.status(400).json({ msg:"usuario o email existente"});

        return next();
     
    } catch (error) {
        
        res.status(400).json("Error al ingresar nuevo usuario");
    }
    
   
}
