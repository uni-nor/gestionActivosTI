const mongoose=require("mongoose");
const titularSchema=require("../schemas/titularSchema");
const activoSchema=new mongoose.Schema({
    correlativo:Number,
    codigo:String,
    tipo:String,
    descripcion:String,
    marca:String,
    modelo:String,
    caracteristicas:String,
    color:String,
    fecha_compra:Date,
    fecha_baja:Date,
    estado:String,
    titular:{ type: mongoose.Schema.ObjectId, ref: "Titular" }
},
{timestamps:false,
versionKey:false
}
);
module.exports=activoSchema;