/* const item_model=require('../models/order_Item'); */
const List_Product=require('../models/List_Product');
const product_models = require('../models/product_models');
const {Token_firma}=require('../config/ENV');
const jwt=require('jsonwebtoken');
const UserModels = require('../models/user_models');
const PayModels = require('../models/medios_pago_models');
const StateModels = require('../models/state_model');
const OrderModels = require('../models/order_models');
const ListOrderModels = require('../models/List_Order');;

const list_product=[];

//nuevo producto al pedido
exports.new_product_order =async(req, res) => {


  try {
    //datos que vienen mediante metodo http.
    const { item_id, quantity_of_product } = req.body;

    //buscar producto en la BD mediante id
    const productos=await product_models.findById({_id:item_id});
  
    //objeto NewProduct que guarda los datos del producto, la cantidad y NumeroProducto
    const new_product={
      _id:productos._id,
      N_product:list_product.length+1,
      quantity_of_product
    }
   
    //agrega nuevo producto a la lista(array) de productos
    list_product.push(new_product);
    
    //reponde con un msg y la lista de productos
    res.json({
      msg: "Nuevos producto agregado",
      res: list_product
    });
    
  } catch (error) {
    console.log(error)
    res.json({
      msg:"producto no encontrado"
    });
    
  }
  

}

 //finalizacion del pedido
exports.finalize_order = async (req, res) => {

  try {
    //variables
    const{way_pay,direction}=req.body;
    let usuario,direccion,orderItem,state,direc,Method_pay;
    
    //variable de decodificacion del token
    const token=req.headers.authorization.split(' ')[1];
    const decodificar=jwt.decode(token,Token_firma);
    const id=decodificar.id;
    
    //objeto nuevo pedido
    const new_order={
      usuario, 
      way_pay,
      direccion, 
      orderItem, 
      state
    }

    //datos traidos de la base de datos
    const userFind=await UserModels.findById(id);
    const ListProduct= await List_Product.create({producto:list_product}); 
    const State=await StateModels.findOne({name:'pendiente'});

    userFind.direccion.forEach(element=>{
      if(element===direction) return direc=direction
    });

    if(direc){
      new_order.direccion=direc
    }else{
      userFind.direccion.push(direction)
      new_order.direccion=direction;
    }
  
    //verifica que si way_pal es nulo o o vacio
    const foundway=await PayModels.find({medio:{$in:way_pay}});
    Method_pay=foundway.map(pay=>pay._id);

    //guardo el id de los datos en un objeto new_order
    new_order.usuario=userFind._id;
    new_order.way_pay=Method_pay;
    new_order.orderItem=ListProduct._id;
    new_order.state=State._id;

    //si existe en la BD una lista de productos,vacia el array
    if(new_order.orderItem){
      list_product.length=0;
    }

    //guarda la nueva orden en la BD
    const ORDER=await OrderModels.create(new_order);

    //agrega el pedido al usaurio y lo guarda en la BD con los datos actualizados
    userFind.order.push(ORDER._id);
    await userFind.save();

    //guarda el pedido en una lista de pedidos generales 
    await ListOrderModels.create({_id:ORDER._id});

    res.status(200).json({
      New_order:ORDER
    });
    
  } catch (error) {

    console.log(error);
    res.status(400).json({
      msg:"no se pudo crear el pedido"
    });
  }

}

//editar un pedido si todavia no finalizo
exports.edit_order = async(req, res) => {
  try {
    //numero de producto mediante metodo http
    const {num_product} = req.params

    //cantidad de productos
    const {quantity_of_product} = req.body

    //recorre lista de productos 
    list_product.forEach(element=>{
      //compara los numeros de productos de cada elemento con el que se solicito 
      if (element.N_product===parseInt(num_product)) {
        //almacena la nueva cantidad de producto del elemento solicitado 
        element.quantity_of_product=quantity_of_product;
        
      }
    });

    //responde con la lista de productos actulizada
    res.status(200).json({
      msg:list_product
    });
    
  } catch (error) {
    res.status(400).json({
      msg:"no se a podido modificar"
    });
  }
}

//eliminar un producto del pedido
exports.delete_order =(req, res) => {

  try {
    //numero de producto
    const {num_product} = req.params;


    //recorre el array de productos
    list_product.forEach((element,i)=>
    {
      //compara los numero de productos de todos los elementos con el numero de producto solicitado 
      if (element.N_product===parseInt(num_product)) {
        //lanza true
        //elimina el elemento de la lista mediante el indice "i"
        list_product.splice(i,1);
      }

    });

    //reasignar el numero de producto mediante el orden
    list_product.forEach((element,i)=>{
      element.N_product=i+1;
    });

    //responde con un mesaje y la lista de productos actualizada
    res.json({
      msg:"Lista de productos actulizada",
      list:list_product
    });

  } catch (error) {
    res.json({
      mensaje:"el producto ya fue eliminado o el producto no existe"
    });
  
  }
}

//historial de pedidos del usuario 
exports.get_record = async (req, res) => {

  try {
    //llama al token y lo divide en tres cadenas y despues decodifica el token para obtener el dato 
    const token=req.headers.authorization.split(' ')[1];
    const decodificar=jwt.decode(token,Token_firma);
  
    //se guarda el id que se obtiene del token en una constante 
    const id_usuario=decodificar.id;
  
    //se busca el usaurio mediante el id
    const userFind=await UserModels.findById(id_usuario)
    .populate({path:'order',populate:[{path:'_id',populate:{path:'_id',populate:{path:"orderItem",model:'List'}}}]});
  
    //se guarda la orden en una constante 
    const Ord=userFind.order;
  
  
    //responde mostrando el historial de ordenes 
    res.status(200).json({
      pedidos: Ord
    })
    
  } catch (error) {
    res.json({
      mensaje:"No se encontro ningun usaurio con ese id"
    });
  }
   
}

//todos los pedidos
exports.get_all_orders = async(req, res) => {

  try {
    //llama a todos los pedidos que se encuentran guardados en la base de datos
    const list=await ListOrderModels.find()
    .populate({path:'_id',populate:{path:'usuario',select:"usuario"}})
    .populate({path:'_id',populate:{path:'way_pay',select:"medio"}})
    .populate({path:'_id',populate:{path:'orderItem',populate:{path:'producto',populate:{path:'_id',select:['nombre','precio']}}}})
    .populate({path:'_id',populate:{path:'state',select:"name"}});  
    
    //responde con todos los pedidos de la base de datos 
    res.status(200).json({
      pedidos: list     
    });
    
  } catch (error) {
    res.json("No Exiten Listas");
    
  }
}

//estado del pedido
exports.edit_status_order = async (req, res) => {

  try {
    //llama por parametro el id del pedido
    const {id_order}=req.params;
    
    //llama al pedido a modificar el estado
    const Ord_list= await OrderModels.findById({_id:id_order});
  
  
    //llama a todos los estados guardados en la base de datos
    const pendiente= await StateModels.findOne({name:"pendiente"});
    const confirmado= await StateModels.findOne({name:"confirmado"});
    const enPreparacion= await StateModels.findOne({name:"en_preparacion"});
    const enviado= await StateModels.findOne({name:"enviado"});
    const entregado= await StateModels.findOne({name:"entregado"});
  
    //comparar dos objetos si son iguales y guardar el nuevo estado en la atributo state
    if (Ord_list.state.equals(pendiente._id)) {
  
      Ord_list.state=confirmado._id;
      
    }else if (Ord_list.state.equals(confirmado._id)) {
  
      Ord_list.state=enPreparacion._id;
  
    }else if (Ord_list.state.equals(enPreparacion._id)) {
  
      Ord_list.state=enviado._id;
  
    }else if (Ord_list.state.equals(enviado._id)) {
  
      Ord_list.state=entregado.id;
  
    }
    //guarda el objeto modificado en la base de datos
    await Ord_list.save();
  
    //devuelve respuesta del nuevo estado del pedido 
    res.json({
      Order_select:Ord_list
    })
    
  } catch (error) {
    res.status(400).json({
      msg:"uhhh hubo un error al actualizar estado del pedido"
    });
    
  }
} 

 
