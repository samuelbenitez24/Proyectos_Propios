const WayPaymodel=require("../models/medios_pago_models");
const StateModels = require('../models/state_model');
const OrderModels = require('../models/order_models');

exports.Validar_Id_Order=(req,res,next)=>{
    try {
        const{id_order}=req.params;

        const ExpRegSoloNumeros=/^[0-9a-fA-F]{24}$/;

        if(!ExpRegSoloNumeros.test(id_order)) throw new Error
        
        next();
    } catch (error) {
        res.status(400).json({
            msg:"Error, Debe ingresar el id del pedido"
        })   
    }

}

exports.Validar_New_order= async (req,res,next)=>{

    try {

        const {way_pay,direction}=req.body;

        if (way_pay===null || way_pay=="" || !way_pay){ 
            throw  new  Error
        }else if(direction===null  || direction=="" || !direction){
            throw  new Error
        }else{
            next()
        }    
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Error,Debe completar todos los campos"
            
        });
    }
}

exports.Validar_New_order_waypay= async (req,res,next)=>{

    try {

        const {way_pay}=req.body;

        const WayPay = await WayPaymodel.findOne({medio:way_pay});
        
        if(WayPay.medio!=way_pay){
            throw new Error
        }else {
            next();
        }
        
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Error,medio de pago no existente"
            
        });
    }
}


exports.validar_Productos=(req,res,next)=>{

    try {

        const { item_id, quantity_of_product } = req.body;

        if(item_id===null || item_id==="" || !item_id){
            throw new Error
        }else if(quantity_of_product===null || quantity_of_product==="" || !quantity_of_product){
            throw new Error
        }else{
            next();
        }
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Tiene que completar todos los campos"
        });
    }
}

exports.validar_cantidad_product=(req,res,next)=>{

    try {
        const {quantity_of_product} = req.body

        if(quantity_of_product===null || quantity_of_product==="" || !quantity_of_product){
            throw new Error
        }else{
            next();
        }
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Tiene que completar todos los campos"
        });
    }
}

exports.Validar_order_edit= async (req,res,next)=>{
    try {

        const {id_order}=req.params;

        const status = await StateModels.findOne({name:"entregado"})
        const Order = await OrderModels.findById({_id:id_order});
        if(!id_order){
            throw new Error

        }else if(status_name===null || status_name==="" || !status_name){
            throw new Error

        }else if(Order.state.equals(status._id)){
            throw new Error

        }else{
            next();
        }
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Tiene que completar todos los campos"
        });
    }

}

exports.Validar_order_state= async (req,res,next)=>{
    try {

        const {id_order}=req.params;

        const status = await StateModels.findOne({name:"entregado"})
        const Order = await OrderModels.findById({_id:id_order});
        
        if(Order.state.equals(status._id)){
            throw new Error

        }else{
            next();
        }
        
    } catch (error) {
        
        res.status(400).json({
            msg:" Pedido ya ha finalizado"
        });
    }

}