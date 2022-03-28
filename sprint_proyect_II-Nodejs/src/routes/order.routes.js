//se levanta express(servidor)
const express=require('express');
const router=express.Router();


const{ 
    new_product_order,
    finalize_order,
    get_all_orders,
    get_record,
    delete_order,
    edit_order,
    edit_status_order 
}=require("../controllers/controller_Order");
const{ Validar_Id_Order,Validar_New_order,validar_Productos, Validar_order_state, Validar_New_order_waypay}=require("../middleware/validarOrder");

const {
    autenticarUsaurio
}=require("../middleware/validation_token");
const{
    isAdmin
}=require("../middleware/validation_token");


/**
 * @swagger
 * tags:
 *  name: Order
 *  description: endpoint Order
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewOrder:
 *       type: object
 *       properties:
 *         item_id:
 *           type: string
 *           example: "617178d23eaa6dd294e70f63"
 *         quantity_of_product:
 *           type: integer
 *           example: 3
 *       required:
 *         - item_id
 *         - quantity_of_product
 *     finish the order:
 *       type: object
 *       properties:
 *         way_pay:
 *           type: array
 *           items:
 *             type:string
 *           example: ["MercadoPago"]
 *         direction:
 *           type: string
 *           example: "juan cabo peña 34"
 *       required:
 *         - way_pay
 *     GetRecord:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             example: "Lista de productos"
 *           res:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "617178d23eaa6dd294e70f63"
 *                 nombre:
 *                   type: string
 *                   example: "pizza de muzarella"
 *                 precio:
 *                   type: integer
 *                   example: 23.45
 *     NewOrder:
 *       description: added products
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               New_Order:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "617178d23eaa6dd294e70f63"
 *                     usaurio:
 *                       type: string
 *                       example: "6170bd2fbba8361bc9e80a1e"
 *                     way_pay:
 *                       type: string
 *                       example: "6171874c9e97f22955e50e3d"
 *                     direccion:
 *                       type: string
 *                       example: "juan vega 4324"              
 *                     OrderItems:
 *                       type: string
 *                       example: "61a56f9932457b30ee4fb77a"
 *                     state:
 *                       type: string
 *                       example: "61a566f6e0723ac7ca187de4"
 *                     date:
 *                       type: date
 *                       example: 2021-12-01T19:16:53.686+00:00
 *     orders:
 *       description: added products
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Orders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "617178d23eaa6dd294e70f63"
 *                     usaurio:
 *                       type: string
 *                       example: "6170bd2fbba8361bc9e80a1e"
 *                     way_pay:
 *                       type: string
 *                       example: "6171874c9e97f22955e50e3d"             
 *                     OrderItems:
 *                       type: string
 *                       example: "61a56f9932457b30ee4fb77a"
 *                     state:
 *                       type: string
 *                       example: "61a566f6e0723ac7ca187de4"
 *                     date:
 *                       type: date
 *                       example: 2021-12-01T19:16:53.686+00:00
 *     state:
 *       description: added products
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 example: "61a566f6e0723ac7ca187de4"
 *     NotCreateOrder:
 *       description: Not add product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hubo un error al agregar producto"
 *     UnauthorizedError:
 *       description: Unauthorized Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, no se pudo auntenticar el usuario"         
 */
/**
 * @swagger
 * 
 * /api/order/New_orden:
 *  post:
 *    summary: add product to order
 *    description: select the product and add to the list
 *    operationId: post New Order
 *    tags: [Order]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateNewOrder'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/NewProduct'
 *      400:
 *        $ref: '#/components/schemas/NotCreateOrder'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 * 
 */
router.post('/New_orden',[autenticarUsaurio,validar_Productos],new_product_order);

/**
 * @swagger
 * /api/order/edit_quantity_product/num_product/{num_product}:
 *  put:
 *    summary: update product quantity
 *    description: change the number of products
 *    tags: [Order]
 *    parameters:
 *    - name: num_product
 *      in: path
 *      description: num_product
 *      example: "1"
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             quantity_of_product:
 *               type: integer
 *               example: 5
 *    responses:
 *      200:
 *       description: product update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuesta:
 *                 type: string
 *                 example: "producto actulizado"
 *               message:
 *                 type: string
 *                 example: "Lista de productos actulizada"
 *               List:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a56f9932457b30ee4fb77a"
 *                     N_producto:
 *                       type: integer 
 *                       example: 1
 *                     quantity_of_product:
 *                       type: integer
 *                       example: 2
 *      400:
 *       description: error updating product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "could not update the number of products"
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *        
 */
  router.put('/edit_quantity_product/num_product/:num_product',[autenticarUsaurio],edit_order);

/**
 * @swagger
 * /api/order/delete_product/num_product/{num_product}:
 *  delete:
 *    summary: product delete
 *    description: remove product from list
 *    tags: [Order]
 *    parameters:
 *    - name: num_product
 *      in: path
 *      description: num_product
 *      example: "1"
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *       description: product delete
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuesta:
 *                 type: string
 *                 example: "producto eliminado"
 *               message:
 *                 type: string
 *                 example: "Lista de productos actulizada"
 *               List:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a56f9932457b30ee4fb77a"
 *                     N_producto:
 *                       type: integer 
 *                       example: 1
 *                     quantity_of_product:
 *                       type: integer
 *                       example: 2
 *      400:
 *       description: error delete product 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error a eliminar el producto de la lista"
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 * 
 */
 router.delete('/delete_product/num_product/:num_product',[autenticarUsaurio],delete_order);



/**
 * @swagger
 * 
 * /api/order/fanalize_order:
 *  post:
 *    summary: close order
 *    description: finish the order
 *    tags: [Order]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/finish the order'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/NewOrder'
 *      400:
 *        $ref: '#/components/schemas/NotCreateOrder'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 * 
 */
router.post('/fanalize_order',[autenticarUsaurio,Validar_New_order,Validar_New_order_waypay],finalize_order);

/**
 * @swagger
 * /api/order/record:
 *  get:
 *    summary: user history
 *    description: shows the user's order history
 *    operationId: getRecord
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetRecord'
 *      400:
 *        $ref: '#/components/schemas/NotFount' 
 * 
 */
 router.get('/record',[autenticarUsaurio],get_record);

 /**
 * @swagger
 * /api/order/orders:
 *  get:
 *    summary: orders
 *    description: all orders
 *    operationId: getOrder
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/orders'
 *      400:
 *        $ref: '#/components/schemas/NotFount' 
 * 
 */
router.get('/orders',[autenticarUsaurio,isAdmin],get_all_orders);
 
 /**
  * @swagger
  * /api/order/order_status/id_order/{id_order}:
  *  put:
  *    summary: update state to order
  *    description: save the new order status
  *    security:
  *    - bearerAuth: []
  *    tags: [Order]
  *    parameters:
  *    - name: id_order
  *      in: path
  *      description: id_order
  *      example: "5eb12e197e06a76ccdefc121"
  *      required: true
  *      schema:
  *        type: string
  *    responses:
  *      200:
  *         $ref: '#/components/schemas/state'
  *      400:
  *       description: error updating product
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               message:
  *                 type: string
  *                 example: "pedido ya finalizado "
  *      401:
  *        $ref: '#/components/schemas/UnauthorizedError'
  *        
  */
router.put('/order_status/id_order/:id_order',[autenticarUsaurio,isAdmin,Validar_Id_Order,Validar_order_state],edit_status_order);


 //exportamos las rutas
module.exports=router;