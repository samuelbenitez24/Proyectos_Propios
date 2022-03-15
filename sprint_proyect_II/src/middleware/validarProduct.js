
exports.Validar_Id_product=(req,res,next)=>{
    try {
        const{id}=req.params;

        if(!id) throw new Error
        
        next();
    } catch (error) {
        res.status(400).json({
            msg:"Error, Debe ingresar el id_product"
        })   
    }

}


exports.validar_campos=(req,res,next)=>{


    try {
        const {nombre,precio}=req.body;
        
        
        if (nombre==="" || nombre===null || precio==="" || precio===null) {

            throw new Error()
        
        }else if (nombre==="" || nombre===null) {

            throw new Error()
        
        }else if(precio==="" || precio===null){
            throw new Error()

        }else{
        
           next();
        }
        
    } catch (error) {
        res.status(400).json({
            msg:"Error, Debe completar todos los campos"
        })
    }
    

}

exports.validar_edit_product=(req,res,next)=>{


    try {

        const{id}=req.params;
        const {precio}=req.body;

        if(!id){
            throw new Error   

        }else if(precio==="" || precio===null || !precio){
            throw new Error

        }else{
        
           next();
        }
        
    } catch (error) {
        res.status(400).json({
            msg:"Error, Debe completar todos los campos"
        })
    }
    

}






