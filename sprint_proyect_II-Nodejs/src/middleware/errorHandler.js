// Middleware para el Error 404 cuando no se encuentra un recurso o ruta
exports.Error404=(req, res, next)=>{
    res.status(404).json({status:404,msg:'Error 404 not fount,no se pudo encontrar la la ruta de la url'});
}

exports.Error500SyntaxError=(error,req,res,next)=>{
    if(error instanceof SyntaxError){
        return res.status(500).json({msg:"invalid data structure"});
    }else{
        next()
    }
}
