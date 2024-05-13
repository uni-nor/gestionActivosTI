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
            correlativo: req.body.correlativo,
            codigo: req.body.codigo,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            marca: re1.body.marca,
            modelo: req.body.modelo,
            caracteristicas: req.body.caracteristicas,
            color: req.body.color,
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
            fecha_compra: req.body.fecha_compra,
            fecha_baja: req.body.fecha_baja,
            estado: req.body.estado
    });
});




module.exports=rutas;