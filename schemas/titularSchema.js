const mongoose=require("mongoose");
const activoSchema=require("../schemas/activoSchema");
const titularSchema=new mongoose.Schema({
    nombre:String,
    primer_apellido:String,
    segundo_apellido:String,
    sexo:String,
    fecha_nacimiento:Date
    //activos: [activoSchema]
    //activos: [{type: mongoose.Schema.ObjectId, ref: "activo"}]
},
{timestamps:false,
versionKey:false
}
);
module.exports=titularSchema;