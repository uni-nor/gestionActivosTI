const express=require("express");
const rutas=express.Router();
const ActivoModel=require("../model/Activo");


//1.- listar todos
rutas.get('/listar',async (req,res)=>{
    try {
        const listaActivos=await ActivoModel.find();
        res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});

//2.- crear
rutas.post('/crear',async (req,res)=>{
    const act=req.body;
    const activo=new ActivoModel({
            correlativo: act.correlativo,
            codigo: act.codigo,
            tipo: act.tipo,
            descripcion: act.descripcion,
            marca: act.marca,
            modelo: act.modelo,
            caracteristicas: act.caracteristicas,
            color: act.color,
            // hardware: {
            //   cpu: "INTEL Corei7 10ma Generacion",
            //   ram: "16GB",
            //   tipo_ram: "DDR2",
            //   almacenamiento: "2T",
            //   tipo_almacenamiento: "SSD",
            //   tarjeta_madre: "INTEL PB125"
            // },
            // software: [
            //   {
            //     nombre: "WINDOWS 11 HOME",
            //     tipo: "SISTEMA OPERATIVO",
            //     descripcion: "",
            //     empresa: "Microsoft"
            //   },
            //   {
            //     nombre: "WORD 2021",
            //     tipo: "OFFICE",
            //     descripcion: "PROCESADOR DE TEXTO",
            //     empresa: "Microsoft"
            //   },
            //   {
            //     nombre: "BITDEFENDER FREE",
            //     tipo: "ANTIVIRUS",
            //     descripcion: "ANTIVIRUS GRATUITO",
            //     empresa: "BITDEFENDER"
            //   }
            // ],
            // configuracion: {
            //   nombre: "DESKTOP01",
            //   ip: "192.168.1.20",
            //   mascara: "255.255.255.0",
            //   puerta_enlace: "192.168.1.1",
            //   dns: "8.8.8.8",
            //   dns_secundario: "8.8.4.4"
            // },
            fecha_compra: act.fecha_compra,
            fecha_baja: act.fecha_baja,
            estado: act.estado
    });
    try {
        const nuevoActivo=await activo.save();
        res.status(201).json(nuevoActivo);
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});


//3.- update
rutas.put('/modificar/:id',async (req,res)=>{
    const id=req.params.id;
    const act=req.body;
    try {
        const activoEditado=await ActivoModel.findByIdAndUpdate(id,act,{new:true});
        if(activoEditado)
            res.json(activoEditado);
        else{
            res.status(404).json({mensaje:"Activo no encontrado"});
        }
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});

//4.- Eliminar
rutas.delete("/eliminar/:id", async (req,res)=>{
    try {
        const activoEliminado=await ActivoModel.findByIdAndDelete(req.params.id);
        if(activoEliminado)
            res.json({mensaje:"Activo eliminado",activo:activoEliminado})
        else
            res.status(404).json({mensaje:"El activo que trata de eliminar no existe."});
    } catch (error) {
        res.status(400).json({mensaje:error.message});
    }
});

//5.- 

module.exports=rutas;