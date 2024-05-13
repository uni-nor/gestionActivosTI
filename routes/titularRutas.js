const express=require("express");
const rutas=express.Router();
const TitularModel=require("../model/Titular");


//1.- listar todos
rutas.get('/listar',async (req,res)=>{
    try {
        const listaTitulares=await TitularModel.find();
        res.json(listaTitulares);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});

//2.- crear
rutas.post('/crear',async (req,res)=>{
    const tit=req.body;
    const titular=new TitularModel({
        nombre:tit.nombre,
        primer_apellido:tit.primer_apellido,
        segundo_apellido:tit.segundo_apellido,
        sexo:tit.sexo,
        fecha_nacimiento:tit.fecha_nacimiento
    });
    try {
        const nuevoTitular=await titular.save();
        res.status(201).json(nuevoTitular);
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});


//3.- update
rutas.put('/modificar/:id',async (req,res)=>{
    const id=req.params.id;
    const act=req.body;
    try {
        const titularEditado=await TitularModel.findByIdAndUpdate(id,act,{new:true});
        if(titularEditado)
            res.json(titularEditado);
        else{
            res.status(404).json({mensaje:"Titular no encontrado"});
        }
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});

//4.- Eliminar
rutas.delete("/eliminar/:id", async (req,res)=>{
    try {
        const titularEliminado=await TitularModel.findByIdAndDelete(req.params.id);
        if(titularEliminado)
            res.json({mensaje:"Titular eliminado",titular:titularEliminado})
        else
            res.status(404).json({mensaje:"El titular que trata de eliminar no existe."});
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});

module.exports=rutas;