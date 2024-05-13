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

//5. obtener una activos por su ID
rutas.get('/listar-porid/:id', async (req, res) => {
    try {
        const activo = await ActivoModel.findById(req.params.id);
        if (!activo)
            return res.status(404).json({ mensaje : 'Activo no encontrada!!!'});
        else 
            return res.json(activo);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//6.- listar todos los activos por tipo o marca de manera exacta
rutas.get('/listar-por-tipo-marca/:tipo/:marca',async (req,res)=>{
    try {
        const listaActivos=await ActivoModel.find({$or:[ { tipo:req.params.tipo }, {marca:req.params.marca}] });
        res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});


//7.- listar todos los activos que contengan el texto ingresado en tipo o marca (ambos)
rutas.get('/listar-por-tipo-marca-texto/:texto',async (req,res)=>{
    try {
        console.log(req.params.texto);
        const listaActivos=await ActivoModel.find({$and:[ { tipo: new RegExp(req.params.texto, 'i') }, 
                                                          {marca:new RegExp(req.params.texto, 'i')}] });
        res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});
        

//8.- obtener lista de activos que tenga el texto de busqueda en cualquiera de sus campos
rutas.get('/listar-busqueda/:texto',async (req,res)=>{
    try {
        console.log(req.params.texto);
        const listaActivos=await ActivoModel.find({$or:[ { tipo:new RegExp(req.params.texto, 'i') }, 
                                                        { descripcion:new RegExp(req.params.texto, 'i')},
                                                        { marca:new RegExp(req.params.texto, 'i')},
                                                        { modelo:new RegExp(req.params.texto, 'i')},
                                                        { caracteristicas:new RegExp(req.params.texto, 'i')},
                                                        { color:new RegExp(req.params.texto, 'i')},
                                                        { estado:new RegExp(req.params.texto, 'i')},
                                                    ] 
                                                  });
          res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});


//9.- obtener los activos diferentes al estado inactivo
rutas.get('/listar-activos',async (req,res)=>{
    try {
        console.log(req.params.texto);
        const listaActivos=await ActivoModel.find({estado:{$ne:"INACTIVO"}});
        res.json(listaActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});


//10.- obtener la cantidad de activos 
rutas.get('/listar-cantidad-activos',async (req,res)=>{
    try {
        console.log(req.params.texto);
        const cantidadActivos=await ActivoModel.find().countDocuments({estado:"ACTIVO"});
        res.json("la cantidad de activos en estado ACTIVO es:"+cantidadActivos);
    } catch (error) {
        res.status(500).json({menssaje:error.message})
    }
});

module.exports=rutas;