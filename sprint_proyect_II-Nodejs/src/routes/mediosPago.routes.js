//se levanta express(servidor)
const express=require('express');
const router=express.Router();

const {get_all_payment_methods,add_means_payment,edit_means_payment,delete_means_payment}=require('../controllers/controller_medioPago');
const { NamePayment, NamePaymenEdit } = require('../middleware/ValidarWayPal');
const { autenticarUsaurio,isAdmin } = require('../middleware/validation_token');

//rutas endpoind
/**
 * @swagger
 * tags:
 *  name: payment
 *  description: endpoint payment
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewMethodsPayment:
 *       type: object
 *       properties:
 *         new_method:
 *           type: string
 *           example: "Tarjeta de Credito"
 *       required:
 *         - new_method
 *     GetPayment:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "lista de medios de pagos"
 *         res:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "617178d23eaa6dd294e70f63"
 *               medio:
 *                 type: string
 *                 example: "Mercado Pago"
 *     NewPaymentMethods:
 *       description: New methods payment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "lista de medios de pagos"  
 *               half:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "617178d23eaa6dd294e70f63"
 *                   medio:
 *                     type: string
 *                     example: "Tarjeta de Credito"
 * 
 *     NotCreateMethodsPayment:
 *       description: Not creater Mehotds Payment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error al crear un nuevo medio"
 *     NotFount:
 *       description: Not Fount
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "No se pudo encontrar elemento/s"
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error a auntenticar usuario"       
 */

/**
 * @swagger
 * /api/payment/All_payment_methods:
 *  get:
 *    summary: Get a list of all payment_methods
 *    description: all to the payment_methods
 *    operationId: getAllPayment
 *    security:
 *      - bearerAuth: []
 *    tags: [payment]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetPayment'
 *      400:
 *        $ref: '#/components/schemas/NotFount' 
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 */

router.get('/All_payment_methods',[autenticarUsaurio,isAdmin],get_all_payment_methods);

/**
 * @swagger
 * 
 * /api/payment/add_means_payment:
 *  post:
 *    summary: add means payment
 *    description: create new methods payment
 *    security:
 *    - bearerAuth: []
 *    tags: [payment]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateNewMethodsPayment'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/NewPaymentMethods'
 *      400:
 *        $ref: '#/components/schemas/NotCreateMethodsPayment'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 * 
 */
router.post('/add_means_payment',[autenticarUsaurio,isAdmin,NamePayment],add_means_payment);
/**
 * @swagger
 * /api/payment/edit_means_payment/{id}:
 *  put:
 *    summary: update method payment
 *    description: update methods payment
 *    security:
 *    - bearerAuth: []
 *    tags: [payment]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id methods payment
 *      example: "5eb12e197e06a76ccdefc121"
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            name_half:
 *               type: string
 *               example: "Mercado Pago"
 *    responses:
 *      200:
 *       description: methods payment update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "producto actualizado"
 *               half:
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "617178d23eaa6dd294e70f63"
 *                     medio:
 *                       type: string
 *                       example: "Mercado Pago"
 *      400:
 *       description: error updating methods
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error no se pudo modificar el medio de pago"
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *        
 */
router.put('/edit_means_payment/:id',[autenticarUsaurio,isAdmin,NamePaymenEdit],edit_means_payment);

/**
 * @swagger
 * /api/payment/remove_means_payment/{id}:
 *  delete:
 *    summary: delete method payment
 *    description: delete to methods payment
 *    tags: [payment]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id methods payment
 *      example: "62207db342ec0b05953ba3cc"
 *      required: true
 *    responses:
 *      200:
 *       description: user delete
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "medio eliminado, lista de medios de pago:"
 *               res:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "617178d23eaa6dd294e70f63"
 *                   medio:
 *                     type: string
 *                     example: "Mercado Pago"
 *      400:
 *       description: error delete user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error a eliminar el medio de pago"
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 * 
 */
router.delete('/remove_means_payment/:id',[autenticarUsaurio,isAdmin],delete_means_payment);

module.exports=router;