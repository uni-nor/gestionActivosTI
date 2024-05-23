const mongoose = require('mongoose')            //paquetes requeridos
const ubicacionSchema=require('../schemas/ubicacionSchema');

//=====================================================================================================
const Ubicacion = mongoose.model('Ubicacion', ubicacionSchema,'ubicacion')     
module.exports = Ubicacion                                                       