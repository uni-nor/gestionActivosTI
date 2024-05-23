const express = require('express')

const {listarSeguimientos, crearSeguimiento, modificarSeguimientoPorId, eliminarSeguimientoPorId,reporteSeguimientoActivos}=require("../controllers/seguimientoController");

const rutas = express.Router()

//1.- listar todos
rutas.get('/listar',listarSeguimientos);
//2.- crear
rutas.post('/crear',crearSeguimiento);
//3.- update
rutas.put('/modificar/:id',modificarSeguimientoPorId);
//4.- Eliminar
rutas.delete("/eliminar/:id", eliminarSeguimientoPorId);

//R2 obtener todos los activos, cantidad de seguimientos, detalle seguimiento y detalle de ubicacion origen y destino
rutas.get('/reporte-seguimiento-activos/:activoId',reporteSeguimientoActivos);

module.exports = rutas