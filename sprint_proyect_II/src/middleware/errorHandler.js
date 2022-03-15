exports.Error404=(req, res, next)=>{
    res.status(404).json({status:404,msg:'Error 404 not fount,no se pudo encontrar la la ruta de la url'});
}
