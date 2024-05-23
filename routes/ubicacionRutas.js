const express = require('express')

const {listarUbicaciones, crearUbicacion, modificarUbicacionPorId, eliminarUbicacionPorId}=require("../controllers/ubicacionController");

const rutas = express.Router()

//1.- listar todos
rutas.get('/listar',listarUbicaciones);
//2.- crear
rutas.post('/crear',crearUbicacion);
//3.- update
rutas.put('/modificar/:id',modificarUbicacionPorId);
//4.- Eliminar
rutas.delete("/eliminar/:id", eliminarUbicacionPorId);

module.exports = rutas