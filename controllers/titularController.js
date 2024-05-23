const ActivoModel = require('../model/Activo');
const TitularModel = require('../model/Titular');
//=====================================================================
//1.- GET LISTAR
//=====================================================================
const listarTitulares =async (req,res)=>{
    try {
        const listaTitulares=await TitularModel.find();
        res.json(listaTitulares);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
}
//=====================================================================
//2.- POST CREAR 
//=====================================================================
const crearTitular =async (req,res)=>{
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
}

//=====================================================================
//3.- MODIFICAR POR ID
//=====================================================================
const modificarTitularPorId=async (req,res)=>{
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
}

//=====================================================================
//4.- ELIMINAR POR ID
//=====================================================================
const eliminarTitularPorId= async (req,res)=>{
    try {
        const titularEliminado=await TitularModel.findByIdAndDelete(req.params.id);
        if(titularEliminado)
            res.json({mensaje:"Titular eliminado",titular:titularEliminado})
        else
            res.status(404).json({mensaje:"El titular que trata de eliminar no existe."});
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//5. obtener  por su ID
//=====================================================================
const obtentenerTitularPorId= async (req, res) => {
    try {
        const titular = await TitularModel.findById(req.params.id);
        if (!titular)
            return res.status(404).json({ mensaje : 'Titular no encontrado!!!'});
        else 
            return res.json(titular);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
}

module.exports = {
    listarTitulares,
    crearTitular,
    modificarTitularPorId,
    eliminarTitularPorId,
    obtentenerTitularPorId
}