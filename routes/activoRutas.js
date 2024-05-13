const express=require("express");
const rutas=express.Router();
const ActivoModel=require("../model/Activo");


//1.- listar todos
rutas.get('/listar-activos',async (req,res)=>{
    try {
        const listaActivos=await ActivoModel.find();
        res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});

//2.- crear
rutas.post('/crear',async (req,res)=>{
    const act=new ActivoModel({
        
    });
});




module.exports=rutas;