const UbicacionModel = require('../model/Ubicacion');
//=====================================================================
//1.- GET LISTAR
//=====================================================================
const listarUbicaciones =async (req,res)=>{
    try {
        const listaUbicaciones=await UbicacionModel.find();
        res.json(listaUbicaciones);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
}
//=====================================================================
//2.- POST CREAR 
//=====================================================================
const crearUbicacion =async (req,res)=>{
    const ubi=req.body;
    const ubicacion=new UbicacionModel({
        nombre:ubi.nombre,
        descripcion:ubi.descripcion
    });
    try {
        const nuevaUbicacion=await ubicacion.save();
        res.status(201).json(nuevaUbicacion);
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//3.- MODIFICAR POR ID
//=====================================================================
const modificarUbicacionPorId=async (req,res)=>{
    const id=req.params.id;
    const ubi=req.body;
    try {
        const ubicacionEditada=await UbicacionModel.findByIdAndUpdate(id,ubi,{new:true});
        if(ubicacionEditada)
            res.json(ubicacionEditada);
        else{
            res.status(404).json({mensaje:"Ubicacion no encontrada"});
        }
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//4.- ELIMINAR POR ID
//=====================================================================
const eliminarUbicacionPorId= async (req,res)=>{
    try {
        const ubicacionEliminada=await UbicacionModel.findByIdAndDelete(req.params.id);
        if(ubicacionEliminada)
            res.json({mensaje:"Ubicacion eliminada",ubicacion:ubicacionEliminada})
        else
            res.status(404).json({mensaje:"La ubicación que trata de eliminar no existe."});
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//5. obtener  por su ID
//=====================================================================
const obtentenerUbicacionPorId= async (req, res) => {
    try {
        const ubicacion = await UbicacionModel.findById(req.params.id);
        if (!ubicacion)
            return res.status(404).json({ mensaje : 'Ubicación no encontrada!!!'});
        else 
            return res.json(ubicacion);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
}

module.exports = {
    listarUbicaciones,
    crearUbicacion,
    modificarUbicacionPorId,
    eliminarUbicacionPorId,
    obtentenerUbicacionPorId
}