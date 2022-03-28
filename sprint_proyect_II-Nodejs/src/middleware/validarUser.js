//llamar al objeto usuarios del archivo externo
const user_models=require('../models/user_models');
const order = require('../models/order_models');
const OrderLists=require('../models/List_Order');
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

    const {usuario,nombre,apellido,email,telefono,direccion,password}=req.body;
    let expresion =/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    
    if (!expresion.test(email)) {
        res.status(400).json({
            respuesta:"Email Invalido"
        });
            
    }else if (usuario=="" || nombre=="" || apellido=="" || email=="" || telefono=="" || direccion==""|| password=="") {
        res.status(400).json({
            respuesta:"Todos los campos necesarios"
        });
    }else{
        next();
    }
    

}; 
//verifica si el usuario esta bloqueado
exports.discontinuedUser = async (req,res,next)=>{

    try{
        const {usuario,password}=req.body;

        const dato_entrada={
            usuario,
            password:encrypto(password)
        }

        const user=await user_models.findOne(dato_entrada);


        if(user.discontinued===true) return res.status(401).json({msg:"esta suspendido"})

        return next()
    }catch (error){
        res.status(400).json("Error , usuario no encontrado");

    }

}

//verifica si hay mail duplicados
exports.Duplicate_user=async(req,res,next)=>{
    try {
        const {usuario,email}=req.body;
    
        const user=await user_models.findOne({usuario:usuario}) || null;
        const correo=await user_models.findOne({email:email}) || null;

        if (user!=null && correo!=null){
            return res.status(400).json({ msg:"persona ya existente con ese user y email"});

        }else if(user!=null || correo!=null){
            return res.status(400).json({ msg:"usuario o email existente"});
        }else{
            next();
        }

        
     
    } catch (error) {
        
        res.status(400).json("Error al ingresar nuevo usuario");
    }
    
   
}


//Middleware para eliminar las referencias de la bd cuando el usuario sea eliminado
exports.deleteRef=async(req,res,next)=>{

    try{
       const {id}=req.params;

       const user=await user_models.findById({_id:id});

        user.order.forEach(async(element) => {

           await OrderLists.deleteOne({_id:element._id});
        });

        await order.deleteMany({usuario:user._id});

        next()
    }catch (error){

       res.status(400).json({msg:"usuario ya no existe"})
    }
}


