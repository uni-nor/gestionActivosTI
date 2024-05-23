const express=require("express");
const rutas=express.Router();
const TitularModel=require("../model/Titular");
const {listarTitulares,    crearTitular,    modificarTitularPorId,
    eliminarTitularPorId,    obtentenerTitularPorId}=require("../controllers/titularController");

//1.- listar todos
rutas.get('/listar',listarTitulares);
//2.- crear
rutas.post('/crear',crearTitular);
//3.- update
rutas.put('/modificar/:id',modificarTitularPorId);

//4.- Eliminar
rutas.delete("/eliminar/:id", eliminarTitularPorId);

module.exports=rutas;