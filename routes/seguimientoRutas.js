const express = require('express')

const {listarSeguimientos, crearSeguimiento, modificarSeguimientoPorId, eliminarSeguimientoPorId}=require("../controllers/seguimientoController");

const rutas = express.Router()

//1.- listar todos
rutas.get('/listar',listarSeguimientos);
//2.- crear
rutas.post('/crear',crearSeguimiento);
//3.- update
rutas.put('/modificar/:id',modificarSeguimientoPorId);
//4.- Eliminar
rutas.delete("/eliminar/:id", eliminarSeguimientoPorId);

module.exports = rutas