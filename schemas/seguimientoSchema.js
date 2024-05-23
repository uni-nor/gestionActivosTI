const mongoose=require("mongoose");
// const ubicacionSchema=require("../schemas/ubicacionSchema");
// const usuarioSchema=require("../schemas/usuarioSchema");
const seguimientoSchema=new mongoose.Schema({
    activo:{ type: mongoose.Schema.ObjectId, ref: "Activo" },
    fecha:Date,
    ubicacion_origen:{ type: mongoose.Schema.ObjectId, ref: "Ubicacion" },
    ubicacion_destino:{ type: mongoose.Schema.ObjectId, ref: "Ubicacion" },
    tipo_seguimiento:String,
    descripcion:String,
    usuario:{ type: mongoose.Schema.ObjectId, ref: "Usuario" }
},
{timestamps:false,
versionKey:false
}
);
module.exports=seguimientoSchema;