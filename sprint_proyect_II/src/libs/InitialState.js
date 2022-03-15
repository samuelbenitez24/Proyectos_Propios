const state=require('../models/state_model');


exports.State=async()=>{

    try {
        const estado=await state.estimatedDocumentCount();

        if (estado>0) return;
        
        const values=await Promise.all([
            state.create({name:'pendiente',state:false}),
            state.create({name:'confirmado',state:false}),
            state.create({name:'en_preparacion',state:false}),
            state.create({name:'enviado',state:false}),
            state.create({name:'entregado',state:false})
        ]);
    } catch (error) {

        console.error('no se pudo crear los estados');
    }
}