const SeguimientoModel = require('../model/Seguimiento');
const ActivoModel = require('../model/Activo');
const UbicacionModel = require('../model/Ubicacion');
const UsuarioModel = require('../model/Usuario');
//=====================================================================
//1.- GET LISTAR
//=====================================================================
const listarSeguimientos =async (req,res)=>{
    try {
        const listaSeguimientos=await SeguimientoModel.find();
        res.json(listaSeguimientos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
}
//=====================================================================
//2.- POST CREAR 
//=====================================================================
const crearSeguimiento =async (req,res)=>{
    const seg=req.body;
    const seguimiento=new SeguimientoModel({
        activo:seg.activo,
        fecha:seg.fecha,
        ubicacion_origen:seg.ubicacion_origen,
        ubicacion_destino:seg.ubicacion_destino,
        tipo_seguimiento:seg.tipo_seguimiento,
        descripcion:seg.descripcion,
        usuario:seg.usuario
    });
    try {
        const nuevoSeguimiento=await seguimiento.save();
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//3.- MODIFICAR POR ID
//=====================================================================
const modificarSeguimientoPorId=async (req,res)=>{
    const id=req.params.id;
    const seg=req.body;
    try {
        const seguimientoEditado=await SeguimientoModel.findByIdAndUpdate(id,seg,{new:true});
        if(seguimientoEditado)
            res.json(seguimientoEditado);
        else{
            res.status(404).json({mensaje:"Seguimiento no encontrado"});
        }
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//4.- ELIMINAR POR ID
//=====================================================================
const eliminarSeguimientoPorId= async (req,res)=>{
    try {
        const seguimientoEliminado=await SeguimientoModel.findByIdAndDelete(req.params.id);
        if(seguimientoEliminado)
            res.json({mensaje:"Seguimiento eliminada",seguimiento:seguimientoEliminado})
        else
            res.status(404).json({mensaje:"El seguimiento que trata de eliminar no existe."});
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
}

//=====================================================================
//5. obtener  por su ID
//=====================================================================
const obtentenerSeguimientoPorId= async (req, res) => {
    try {
        const seguimiento = await SeguimientoModel.findById(req.params.id);
        if (!seguimiento)
            return res.status(404).json({ mensaje : 'Seguimiento no encontrado!!!'});
        else 
            return res.json(seguimiento);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
}


//=====================================================================
//5. obtener seguimientos de un activo
//=====================================================================
const reporteSeguimientoActivos=async (req, res) => {
    const {activoId}=req.params;
    try  {
        var activos;
        if(activoId=="todos")
             activos = await  ActivoModel.find();// obtiene todos los activos
        else
            activos = await  ActivoModel.find({_id:activoId});// obtiene el activo especificado
        const reporte=await Promise.all(
            activos.map(async (a)=>{
                const seguimientos=await SeguimientoModel.find({activo:a._id}).populate('ubicacion_origen','nombre').populate('ubicacion_destino','nombre');
                //const totalPorciones=recetas.reduce((sum,receta)=>sum+receta.porciones,0);
                const totalSeguimientos=seguimientos.length;
                return {
                    activo:{
                        _id:a._id,
                        descripcion:a.descripcion,
                        caracteristicas:a.caracteristicas
                    },
                    // totalPorciones,
                    totalSeguimientos,
                    seguimientos:seguimientos.map(s=>({
                            _id:s._id,
                        fecha:s.fecha.toLocaleDateString('es-CL', { day:"numeric", year:"numeric", month:"short", hour:"numeric",minute:"numeric",second:"numeric"}),
                        movimiento:s.ubicacion_origen.nombre+" --> "+s.ubicacion_destino.nombre,
                        descripcion:s.descripcion,
                    }))
                }
            })
        );
        res.json({cantidad_activos:activos.length,seguimientoActivos:reporte});
    } catch (error){
         res.status(500).json({mensaje: error.message});
    }
}


//=====================================================================
module.exports = {
    listarSeguimientos,
    crearSeguimiento,
    modificarSeguimientoPorId,
    eliminarSeguimientoPorId,
    obtentenerSeguimientoPorId,
    reporteSeguimientoActivos
}