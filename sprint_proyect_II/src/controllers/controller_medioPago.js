const medio_pago = require('../models/medios_pago_models');



//traer lista de metodo de pagos
exports.get_all_payment_methods=async(req,res)=>{

    try {
        
       const get_half=await medio_pago.find();

       if(get_half.length===0) throw new Error

       res.json({
           msg:"lista de medios de pagos",
           respuesta:get_half
       });
        
    } catch (error) {

        res.json({
            msg:'error en mostrar lista de medios'
        });
        
    }

   

}

//agregar un nuevo metodo de pago
exports.add_means_payment=async(req,res)=>{


    try {
        const{new_method}=req.body;

        const new_half={
            medio:new_method
        }

        await medio_pago.create(new_half);

        const Listhalf=await medio_pago.find();

        res.status(200).json({
            msg:"Lista de medio de pago",
            Listhalf
        });
        
    } catch (error) {

        res.json({
            msg:'hubo un error al crear un nuevo medio'
        });
        
    }

}

//editar un metodo de pago existente
exports.edit_means_payment=async(req,res)=>{
    try {
        const{id}=req.params;
        const{name_half}=req.body;

        const half=await medio_pago.findByIdAndUpdate(id,{medio:name_half},{new:true});

        if (!half) throw new error;

        res.json({
            msg:'producto actualizado',
            res:half
        });

    } catch (error) {

        res.json({
            msg:"hubo un error no se pudo modificar el medio de pago"
        });
        
    }


}

//eliminar un metodo de pago
exports.delete_means_payment=async(req,res)=>{


    try {
        const {id}=req.params;

        const half=await medio_pago.findByIdAndDelete(id,{new:true}) || null;

        if (!half) throw new error;

        const list_half=await medio_pago.find();
    
        res.json({

            msg:'medio eliminado, lista de medios de pago:',
            res:list_half

        })
        
    } catch (error) {

        res.json({
            msg:'hubo un error a eliminar el medio de pago'
        });
        
    }

};