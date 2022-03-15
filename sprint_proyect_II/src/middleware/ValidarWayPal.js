exports.NamePayment=(req,res,next)=>{
    try {
        const{new_method}=req.body;
        if(new_method==="" || !new_method || new_method===null) throw new Error
        next()

    } catch (error) {
        
        res.status(400).json({msg:"todos los campos son requeridos"});
    }

}

