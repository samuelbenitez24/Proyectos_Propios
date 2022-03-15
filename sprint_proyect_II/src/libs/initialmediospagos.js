const medios=require('../models/medios_pago_models');


exports.medios_por_defectos=async()=>{

    try {
        const medioPago=await medios.estimatedDocumentCount();

        if (medioPago>0) return;
        
        const values=await Promise.all([
            medios.create({medio:'Efectivo'}),
            medios.create({medio:'Credito'}),
            medios.create({medio:'Debito'})
        ]);
        
    } catch (error) {

        console.log('no se pudo crear los medios');
    }
}