const mongoose=require("mongoose");
const titularSchema=require("../schemas/titularSchema")

// const titularSchema=new mongoose.Schema({
//     nombre:String,
//     primer_apellido:String,
//     segundo_apellido:String,
//     sexo:String,
//     fecha_nacimiento:Date,
//     activos: [ActivoSchema]
// },
// {timestamps:false,
// versionKey:false
// }
// );

const TitularModel=mongoose.model("Titular", titularSchema,"titular");
module.exports=TitularModel;