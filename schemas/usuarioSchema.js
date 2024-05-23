const mongoose=require("mongoose");
const usuarioSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
}
 ,{
    versionKey: false, 
    timestamps: false,
 });

 module.exports=usuarioSchema;