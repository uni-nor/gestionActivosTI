const mongoose = require('mongoose')            //paquetes requeridos
const seguimientoSchema=require('../schemas/seguimientoSchema');

//=====================================================================================================
const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema,'seguimiento')     
module.exports = Seguimiento                                                       