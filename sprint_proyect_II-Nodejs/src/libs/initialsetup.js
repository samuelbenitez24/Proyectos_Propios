const Role=require('../models/roles');

//crea 3 roles al iniciar el servidor ej: admin y user
exports.createRoles=async ()=>{


    try {
        const count=await Role.estimatedDocumentCount();

        if (count>0) return;

        const values=await Promise.all([
            Role.create({name:'admin'}),
            Role.create({name:'user'}),
            Role.create({name:'moderator'})
        ]);


    } catch (error) {
        console.error("no se pudo crear roles");
        
    }

    

    

}