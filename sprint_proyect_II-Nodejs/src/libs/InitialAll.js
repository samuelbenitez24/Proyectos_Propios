const {createRoles}=require('./initialsetup');

const {medios_por_defectos}=require('./initialmediospagos');

const { State } = require("./InitialState");

//inicializa los tres funciones para crear roles medios de pago y estados por defecto
exports.initial=()=>{
    createRoles();
    medios_por_defectos();
    State();
}


