const express=require("express");
const rutas=express.Router();
const ActivoModel=require("../model/Activo");
const {listarActivos,    crearActivo,    modificarPorId,    eliminarPorId,    obtentenerActivoPorId,
    listarActivosPorTipoMarca,    listarActivosPorTipoMarcaTexto,    busquedaPorTexto,    
    listarActivosActivos,    obtenerCantidadActivosActivos,activosPorTitular}=require("../controllers/activoController");

//1.- listar todos
rutas.get('/listar',listarActivos);
//2.- crear
rutas.post('/crear',crearActivo);
//3.- update
rutas.put('/modificar/:id',modificarPorId);
//4.- Eliminar
rutas.delete("/eliminar/:id",eliminarPorId);
//5. obtener una activos por su ID
rutas.get('/listar-porid/:id', obtentenerActivoPorId);
//6.- listar todos los activos por tipo o marca de manera exacta
rutas.get('/listar-por-tipo-marca/:tipo/:marca',listarActivosPorTipoMarca);
//7.- listar todos los activos que contengan el texto ingresado en tipo o marca (ambos)
rutas.get('/listar-por-tipo-marca-texto/:texto',listarActivosPorTipoMarcaTexto);
//8.- obtener lista de activos que tenga el texto de busqueda en cualquiera de sus campos
rutas.get('/listar-busqueda/:texto',busquedaPorTexto);
//9.- obtener los activos diferentes al estado inactivo
rutas.get('/listar-activos',listarActivosActivos);
//10.- obtener la cantidad de activos 
rutas.get('/listar-cantidad-activos',obtenerCantidadActivosActivos);
//R1 obtener activos correspondientes al id de un titular
rutas.get('/activos-por-titular/:titularId',activosPorTitular);



module.exports=rutas;