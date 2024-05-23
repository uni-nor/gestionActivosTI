const mongoose=require("mongoose");
const ubicacionSchema=new mongoose.Schema({
    nombre:String,
    descripcion:String,
},
{timestamps:false,
versionKey:false
}
);
module.exports=ubicacionSchema;