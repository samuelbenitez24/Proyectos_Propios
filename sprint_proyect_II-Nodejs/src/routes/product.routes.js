const express=require('express');
const router=express.Router();

const {
    new_product,
    edit_product,
    delete_product,
    getProduct
}=require('../controllers/controller_Product');

const {
    Validar_Id_product,
    validar_campos,
    validar_edit_product
}=require('../middleware/validarProduct');
const { isAdmin, autenticarUsaurio } = require('../middleware/validation_token');

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: endpoint product
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewProduct:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Hamburgesa de cordero"
 *         precio:
 *           type: integer
 *           example: 22.45
 *       required:
 *         - nombre
 *         - precio
 *     GetProduct:
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
 *     NewProduct:
 *       description: New product create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Nuevo producto creado"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "617178d23eaa6dd294e70f63"
 *                     nombre:
 *                       type: string
 *                       example: "pizza muzarella"
 *                     precio:
 *                       type: integer
 *                       example: 23.55             
 *     NotCreateProduct:
 *       description: Not creater Product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hubo un error al crear producto"
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
 *     UnauthorizedError::
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
 * /api/products/Get_Products:
 *  get:
 *    summary: Get a list of all product
 *    description: Restricted to admin 
 *    operationId: getAllUProduct
 *    security:
 *      - bearerAuth: []
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProduct'
 *      400:
 *        $ref: '#/components/schemas/NotFount' 
 * 
 */

 router.get('/Get_Products',[autenticarUsaurio,isAdmin],getProduct);

/**
 * @swagger
 * 
 * /api/products/new_product:
 *  post:
 *    summary: create new product
 *    description: can be done by any new product
 *    operationId: post new product
 *    security:
 *    - bearerAuth: []
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateNewProduct'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/NewProduct'
 *      400:
 *        $ref: '#/components/schemas/NotCreateProduct'
 * 
 */
router.post('/new_product',[autenticarUsaurio,isAdmin,validar_campos],new_product);
/**
 * @swagger
 * /api/products/edit_product/{id}:
 *  put:
 *    summary: update product
 *    description: update product information
 *    security:
 *    - bearerAuth: []
 *    tags: [Product]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id Product
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
 *             precio:
 *               type: integer
 *               example: 22.47
 *    responses:
 *      200:
 *       description: product update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "producto modificado"
 *               res:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: "muzarella con pollo"
 *                   precio:
 *                     type: integer
 *                     example: 22.47
 *      400:
 *       description: error updating product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error en modificar el producto"
 *        
 */
router.put('/edit_product/:id',[autenticarUsaurio,isAdmin,Validar_Id_product,validar_edit_product],edit_product);

/**
 * @swagger
 * /api/products/delete_product/{id}:
 *  delete:
 *    summary: product delete
 *    description: delete to product
 *    tags: [Product]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id Product
 *      example: "62207db342ec0b05953ba3cc"
 *      required: true
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
 *               res:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "617178d23eaa6dd294e70f63"
 *                     nombre:
 *                       type: string 
 *                       example: "hamburguesa"
 *                     precio:
 *                       type: integer
 *                       example: 22.34
 *      400:
 *       description: error delete user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "hubo un error a eliminar el producto"
 * 
 */
router.delete('/delete_product/:id',[autenticarUsaurio,isAdmin,Validar_Id_product],delete_product);


module.exports=router;