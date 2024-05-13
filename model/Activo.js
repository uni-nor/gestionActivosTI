const mongoose=require("mongoose");
const activoSchema=require("../schemas/activoSchema")
// const activoSchema=new mongoose.Schema({
//     correlativo:Number,
//     codigo:String,
//     tipo:String,
//     tipo:String,
//     descripcion:String,
//     marca:String,
//     modelo:String,
//     caracteristicas:String,
//     color:String,
//     fecha_compra:Date,
//     fecha_baja:Date,
//     estado:String,
//     titular:{ type: Schema.ObjectId, ref: "Titular" }
// },
// {timestamps:false,
// versionKey:false
// }
// );

const ActivoModel=mongoose.model("Activo", activoSchema,"activo");
module.exports=ActivoModel;

