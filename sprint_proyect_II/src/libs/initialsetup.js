const Role=require('../models/roles');

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