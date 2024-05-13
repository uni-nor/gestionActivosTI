// importacion de librerias
const express=require('express');
const mongoose=require("mongoose");
require("dotenv").config();

//CONSTANTES
const app=express();
//rutas
const activoRutas=require("./routes/activoRutas");
const titularRutas=require("./routes/titularRutas");
//configuracion de entorno (enviroment)
const PORT=process.env.PORT||6000;
//conexion mongo
const MONGO_URI=process.env.MONGO_URI;

// configuración convertir el cuerpo del request en json.
app.use(express.json());

mongoose.connect(MONGO_URI).then(
    ()=>{
        console.log("conexion mongo establecida");
        app.listen(PORT,()=>{console.log("Servidor express corriendo en el puerto:"+PORT);});
    }
).catch(error=>console.log("error de conexion",error));

app.use("/activos",activoRutas);
app.use("/titular",titularRutas);
