const client = require('../config/config_redis');
const product = require('../models/product_models');
const {promisify}= require('util')
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


exports.getProduct = async (req,res)=>{

    
    try {

        const cache= await getAsync('products')


        if(cache) return res.status(200).json({
            msg:"Lista de productos: ",
            respuesta:JSON.parse(cache)
        }) 

        const Product=await product.find();

        if(Product.length===0) throw new Error
        
        return res.status(200).json({
            msg:"Lista de productos: ",
            respuesta:Product
        }) 
        
    } catch (error) {

        res.status(400).json({msg:"No se encontro lista de productos!! Agrege productos nuevos"});
        
    }
    
}


//funcion para crear un nuevo producto
exports.new_product=async(req,res)=>{

    try {
        const{nombre,precio}=req.body;

        let newProduct={
            nombre,
            precio
        }

        const Product= await product.create(newProduct);

        const Products = await product.find();

        await setAsync("products",JSON.stringify(Products),'EX',10*60*60);

        res.status(200).json({
            msg:'Nuevo producto creado',
            res:Product
        });

        
    } catch (error) {
        res.status(400).json({
            error:false,
            msg:'Hubo un error al crear producto'
        });

    }

}

//funcion que permite edictar un product
exports.edit_product=async(req,res)=>{

    try {
        const{id}=req.params;
        const{precio}=req.body;
        let Product;

        if (precio) {
            Product=await product.findByIdAndUpdate(id,{precio:precio},{new:true});
            if(!Product) return res.status(400).json({error: 'Producto no encontrado'});
        }

        const Products = await product.find();

        await setAsync("products",JSON.stringify(Products),'EX',10*60*60);


        res.json({
            msg:"producto modificado",
            res:Product
        });
        
    } catch (error) {

        res.json({
            msg:'hubo un error en modificar el producto',
            error:true
        });
        
    }

}

//funcion para eliminar un product 
exports.delete_product=async(req,res)=>{

    try {
        const {id}=req.params;
    
       const sujeto=await product.findByIdAndDelete(id,{new:true});

        if (sujeto===null) return res.json({msg:'el usuario ya fue eliminado o no existe'});


       const Product=await product.find();

       res.json({
           respuesta:'producto eliminado',
           msg:'Lista de productos actulizada',
           res:Product
        })
        
    } catch (error) {
        res.status(400).json({
            msg:'hubo un error a eliminar el producto'

        })
        
    }
    

}