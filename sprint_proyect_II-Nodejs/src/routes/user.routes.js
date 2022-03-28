//se levanta express(servidor)
const express=require('express');
const router=express.Router();


//se traen funciones para validar datos y configuraciones de ruta
const {
    get_user,
    get_users,
    put_user,
    put_discontinued,
    Delete_user,
    put_role_user,
}=require('../controllers/controller_User');
const {singnup,singnin}=require('../controllers/singnup_singnin');
const {autenticarUsaurio,isAdmin}=require("../middleware/validation_token");
const {Login, create_User, Duplicate_user,discontinuedUser,validar_Campos_Login, deleteRef}=require("../middleware/validarUser");

//rutas endpoind
/**
 * @swagger
 * tags:
 *  name: User
 *  description: endpoint user
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Singin:
 *       type: object
 *       properties:
 *         usuario:
 *           type: string
 *           example: "patricio34"
 *         password:
 *           type: string
 *           example: "pass44"
 *       required:
 *         - usuario
 *         - password
 *     SingUp:
 *       type: object
 *       properties:
 *         usuario:
 *           type: string
 *           example: "patricio34"
 *         nombre:
 *           type: string
 *           example: "patricio"
 *         apellido:
 *           type: string
 *           example: "guatemala"
 *         email:
 *           type: string
 *           example: "patrick@gmail.com"
 *         telefono:
 *           type: string
 *           example: "84375837389"
 *         direccion:
 *           type: array
 *           items:
 *             type: string
 *           example: ["juan cabo peña 34"]
 *         password:
 *           type: string
 *           example: "pass44"
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             example: "admin"
 *       required:
 *         - usuario
 *         - email
 *         - password
 *     GetUser:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             example: "5eb12e197e06a76ccdefc121"
 *           usuario:
 *             type: string
 *             example: "example45"
 *           nombre:
 *             type: string
 *             example: "samuel"
 *           apellido:
 *             type: string
 *             example: "benitez"
 *           email:
 *             type: string
 *             example: "test@gmail.com"
 *           telefono:
 *             type: string
 *             example: "543545456"
 *           direccion:
 *             type: string
 *             example: "5an vicente 34"
 *           roles:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "admin"
 *     Succes:
 *       description: User logged in
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Bienvenido,lista de productos"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "pizza muzarella"
 *                     precio:
 *                       type: integer
 *                       example: 23.55
 *               jwtoken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y"
 *     NewUser:
 *       description: New user create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Auth:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Usuario patricio43244 fue creado con exito"
 *               jwtoken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y"                 
 * 
 *     Error:
 *       description: Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, no se pudo encontrar el usuario"
 *     NotCreateUser:
 *       description: Not creater user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, no se pudo registra el usuario"
 *     NotFount:
 *       description: Not Fount
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "No se pudo encontrar elemento"
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
 * 
 * /api/users/login:
 *  post:
 *    summary: the user logs in
 *    description: login to user
 *    security:
 *    - bearerAuth: []
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Singin'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/Succes'
 *      400:
 *        $ref: '#/components/schemas/Error'
 * 
 */
router.post('/login',[Login,validar_Campos_Login,discontinuedUser],singnin);

/**
 * @swagger
 * /api/users/GetUser:
 *  get:
 *    summary: Get a list of all users
 *    description: Restricted to admin users
 *    operationId: getAllUsers
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUser'
 *      400:
 *        $ref: '#/components/schemas/NotFount' 
 * 
 */
router.get('/GetUser',[autenticarUsaurio,isAdmin],get_users);

/**
 * @swagger
 * /api/users/GetUser/{id}:
 *  get:
 *    summary: get a user from the database
 *    description: Restricted to admin users
 *    operationId: get a singler user 
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id User
 *      example: "5eb12e197e06a76ccdefc121"
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUser'
 *      400:
 *        $ref: '#/components/schemas/NotFount'
 * 
 * 
 */

router.get('/GetUser/:id',[autenticarUsaurio,isAdmin],get_user);

/**
 * @swagger
 * 
 * /api/users/createUser:
 *  post:
 *    summary: create new user
 *    description: can be done by any new user
 *    operationId: post new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/SingUp'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/NewUser'
 *      400:
 *        $ref: '#/components/schemas/NotCreateUser'
 * 
 */

router.post('/createUser',[create_User,Duplicate_user],singnup);

/**
 * @swagger
 * /api/users/modification:
 *  put:
 *    summary: update user
 *    description: update user information
 *    security:
 *    - bearerAuth: []
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             usuario:
 *               type: string
 *               example: "patricio34"
 *             email:
 *               type: string
 *               example: "patrick@gmail.com"
 *             telefono:
 *               type: string
 *               example: "84375837389"
 *             password:
 *               type: string
 *               example: "pass44"
 *    responses:
 *      200:
 *       description: user update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "se actualizo el usuario con exito"
 *      400:
 *       description: error updating user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, en actualizar usuario"
 *        
 */

router.put('/modification',[autenticarUsaurio,Duplicate_user],put_user);

/**
 * @swagger
 * /api/users/UserRoleModification/{id}:
 *  put:
 *    summary: update user
 *    description: update user information
 *    security:
 *    - bearerAuth: []
 *    tags: [User]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id User
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
 *             rol:
 *               type: array
 *               items:
 *                 type:string
 *               example: ["admin"]
 *    responses:
 *      200:
 *       description: user rol modification
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "El role del usuario fue modificado"
 *      400:
 *       description: error update rol user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, en actualizar rol del usuario" 
 */
router.put('/UserRoleModification/:id',[autenticarUsaurio,isAdmin],put_role_user);

/**
 * @swagger
 * /api/users/suspendUser/{id}:
 *  put:
 *    summary: update user
 *    description: update user information
 *    security:
 *    - bearerAuth: []
 *    tags: [User]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id User
 *      example: "5eb12e197e06a76ccdefc121"
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *       description: user locked
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "El usuario ivan34 fue bloqueado"
 *      400:
 *       description: error lock user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, en bloquear al usuario"
 *        
 */
router.put('/suspendUser/:id',[autenticarUsaurio,isAdmin],put_discontinued);

/**
 * @swagger
 * /api/users/delete/{id}:
 *  delete:
 *    summary: user delete
 *    description: delete to user
 *    tags: [User]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id User
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
 *                 example: "se elimino el usuario con exito"
 *      400:
 *       description: error delete user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "error, en eliminar usuario"
 * 
 */

router.delete('/delete/:id',[autenticarUsaurio,isAdmin,deleteRef],Delete_user);

//exportamos las rutas
module.exports=router;