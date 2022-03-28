//valida que los campos no esten vacios para crear metodo nuevo
exports.NamePayment=(req,res,next)=>{
    try {
        const{new_method}=req.body;
        if(new_method==="" || !new_method || new_method===null) throw new Error
        next()

    } catch (error) {
        
        res.status(400).json({msg:"todos los campos son requeridos"});
    }

}

//valida que los campo no esten vacios para la modificacion de un metodo
exports.NamePaymenEdit=(req,res,next)=>{
    try {
        const{name_half}=req.body;
        if(name_half==="" || !name_half|| name_half===null) throw new Error
        next()

    } catch (error) {
        
        res.status(400).json({msg:"todos los campos son requeridos"});
    }

}

